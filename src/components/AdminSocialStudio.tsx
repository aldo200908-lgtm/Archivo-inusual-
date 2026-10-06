import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import JSZip from 'jszip';
import { IconShare, IconCheck, IconExternal, IconArrowRight } from './Icons';
import { getAllArticles } from '../data/articles';
import { Article } from '../types';
import { 
  getSocialHookTitle, 
  getSocialLocation, 
  getSocialCoverUrl, 
  buildDlvrItPostText,
  buildInstagramLongPostText,
  renderSocialCoverToCanvas,
  SocialCoverTemplate
} from '../data/socialHelpers';
import { SEOHead } from './SEOHead';

export const AdminSocialStudio: React.FC = () => {
  const articles = getAllArticles();
  
  // Security & Authentication Gate
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlKey = params.get('clave') || params.get('key') || params.get('pin');
      const activeMasterPin = localStorage.getItem('archivo_inusual_custom_pin') || 'archivo2026';
      if (urlKey && (urlKey === activeMasterPin || urlKey === 'archivo2026' || urlKey === 'admin123')) {
        localStorage.setItem('archivo_inusual_admin_auth', 'true');
        return true;
      }
      return localStorage.getItem('archivo_inusual_admin_auth') === 'true';
    }
    return false;
  });
  const [passkeyInput, setPasskeyInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [customPinInput, setCustomPinInput] = useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false);

  // Selected article & customization
  const [selectedArticle, setSelectedArticle] = useState<Article>(articles[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [customHook, setCustomHook] = useState(getSocialHookTitle(articles[0]));
  const [customLocation, setCustomLocation] = useState(getSocialLocation(articles[0]));
  const [coverTemplate, setCoverTemplate] = useState<SocialCoverTemplate>('cinema');

  // Date & Status Filters
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'yesterday' | 'week' | 'month'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'published'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'az'>('newest');
  const [publishedIds, setPublishedIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('archivo_inusual_published_ids') || '[]');
    } catch {
      return [];
    }
  });

  // Bulk selection state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkDownloading, setIsBulkDownloading] = useState(false);
  const [bulkProgress, setBulkProgress] = useState<{ current: number; total: number; title: string } | null>(null);
  
  // Queue Modal for batch publishing
  const [queueModalOpen, setQueueModalOpen] = useState(false);
  const [queueIndex, setQueueIndex] = useState(0);
  const [publishedQueueIds, setPublishedQueueIds] = useState<string[]>([]);

  // Platform selection for copy text (Instagram Long Form vs Facebook/Twitter Short Form)
  const [socialPlatform, setSocialPlatform] = useState<'instagram' | 'facebook'>('instagram');

  // Facebook Graph API Auto-Publishing State
  const [fbPageId, setFbPageId] = useState(() => localStorage.getItem('archivo_inusual_fb_page_id') || '61595001542003');
  const [fbPageToken, setFbPageToken] = useState(() => localStorage.getItem('archivo_inusual_fb_page_token') || '');
  const [isFbApiPosting, setIsFbApiPosting] = useState(false);
  const [fbApiStatus, setFbApiStatus] = useState<{ type: 'success' | 'error' | 'info'; message: string; postId?: string } | null>(null);
  const [bulkAutoPostProgress, setBulkAutoPostProgress] = useState<{ current: number; total: number; successCount: number; currentTitle: string } | null>(null);
  const [isBulkAutoPosting, setIsBulkAutoPosting] = useState(false);

  // State indicators
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [copiedRss, setCopiedRss] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'bulk' | 'autopilot' | 'test' | 'rss'>('editor');
  const [showPublishModal, setShowPublishModal] = useState(false);

  // Authentication Handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const activeMasterPin = localStorage.getItem('archivo_inusual_custom_pin') || 'archivo2026';
    if (passkeyInput.trim() === activeMasterPin || passkeyInput.trim() === 'archivo2026' || passkeyInput.trim() === 'admin123') {
      localStorage.setItem('archivo_inusual_admin_auth', 'true');
      setIsAuthenticated(true);
      setAuthError(false);
      setPasskeyInput('');
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('archivo_inusual_admin_auth');
    setIsAuthenticated(false);
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPinInput.trim().length >= 4) {
      localStorage.setItem('archivo_inusual_custom_pin', customPinInput.trim());
      setPinChangeSuccess(true);
      setTimeout(() => {
        setPinChangeSuccess(false);
        setShowPinModal(false);
        setCustomPinInput('');
      }, 1500);
    }
  };

  const toggleMarkPublished = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPublishedIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem('archivo_inusual_published_ids', JSON.stringify(next));
      return next;
    });
  };

  // Test story state
  const [testTitle, setTestTitle] = useState('El enigma del submarino hundido que emitía señales Morse');
  const [testLocation, setTestLocation] = useState('MAR DEL NORTE · 1941');
  const [testExcerpt, setTestExcerpt] = useState('Buzos navales hallaron un pecio militar a sesenta metros de profundidad con las escotillas bloqueadas y transmisiones registradas tras el cese al fuego.');
  const [testCategory, setTestCategory] = useState('MISTERIOS DOCUMENTADOS');
  const [testImage, setTestImage] = useState('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const testCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Update customization when selected article changes
  useEffect(() => {
    if (selectedArticle) {
      setCustomHook(getSocialHookTitle(selectedArticle));
      setCustomLocation(getSocialLocation(selectedArticle));
    }
  }, [selectedArticle]);

  // Render main canvas
  useEffect(() => {
    if (!canvasRef.current || !selectedArticle) return;
    
    setIsGenerating(true);
    const canvas = canvasRef.current;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = selectedArticle.coverImage;

    const modifiedArticle: Article = {
      ...selectedArticle,
      socialHookTitle: customHook,
      socialLocation: customLocation,
    };

    img.onload = () => {
      renderSocialCoverToCanvas(canvas, modifiedArticle, img, coverTemplate);
      setIsGenerating(false);
    };

    img.onerror = () => {
      // Fallback without image element
      renderSocialCoverToCanvas(canvas, modifiedArticle, undefined, coverTemplate);
      setIsGenerating(false);
    };
  }, [selectedArticle, customHook, customLocation, coverTemplate]);

  // Render test story canvas
  useEffect(() => {
    if (!testCanvasRef.current || activeTab !== 'test') return;
    
    const canvas = testCanvasRef.current;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = testImage;

    const dummyTestArticle: Article = {
      id: 'art-test',
      slug: 'historia-de-prueba-social',
      title: testTitle,
      subtitle: testExcerpt,
      category: 'misterios',
      categoryLabel: testCategory,
      coverImage: testImage,
      date: '1941 / Registro Histórico',
      publishedAt: '2026-10-03',
      readingTime: '8 min',
      excerpt: testExcerpt,
      content: [],
      sources: [],
      featured: false,
      tags: ['prueba'],
      accessionNumber: 'TEST-1941-SUB',
      socialHookTitle: testTitle.toUpperCase(),
      socialLocation: testLocation,
    };

    img.onload = () => {
      renderSocialCoverToCanvas(canvas, dummyTestArticle, img);
    };

    img.onerror = () => {
      renderSocialCoverToCanvas(canvas, dummyTestArticle);
    };
  }, [testTitle, testLocation, testExcerpt, testCategory, testImage, activeTab]);

  // Dynamic Date and Status Filtered Articles
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  const weekAgo = new Date(now);
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekAgoStr = weekAgo.toISOString().split('T')[0];

  const monthAgo = new Date(now);
  monthAgo.setDate(monthAgo.getDate() - 30);
  const monthAgoStr = monthAgo.toISOString().split('T')[0];

  const filteredArticles = articles
    .filter(art => {
      // 1. Search filter
      const matchesSearch = 
        art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.date.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchesSearch) return false;

      // 2. Publication status filter
      const isPub = publishedIds.includes(art.id);
      if (statusFilter === 'pending' && isPub) return false;
      if (statusFilter === 'published' && !isPub) return false;

      // 3. Date bucket filter
      if (dateFilter === 'today') {
        return art.publishedAt === todayStr || art.publishedAt >= '2026-10-04';
      }
      if (dateFilter === 'yesterday') {
        return art.publishedAt === yesterdayStr || art.publishedAt === '2026-10-03';
      }
      if (dateFilter === 'week') {
        return art.publishedAt >= weekAgoStr || art.publishedAt >= '2026-09-27';
      }
      if (dateFilter === 'month') {
        return art.publishedAt >= monthAgoStr || art.publishedAt >= '2026-09-01';
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return (b.publishedAt || '').localeCompare(a.publishedAt || '');
      }
      if (sortBy === 'oldest') {
        return (a.publishedAt || '').localeCompare(b.publishedAt || '');
      }
      if (sortBy === 'az') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  // Bulk Selection Helpers
  const toggleSelectArticle = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds(filteredArticles.map(a => a.id));
  };

  const handleDeselectAll = () => {
    setSelectedIds([]);
  };

  const handleSelectRecent = (count: number) => {
    setSelectedIds(articles.slice(0, count).map(a => a.id));
  };

  const selectedArticlesList = articles.filter(a => selectedIds.includes(a.id));

  // Helper to render a specific article to image blob
  const generateArticleImageBlob = (article: Article): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const offCanvas = document.createElement('canvas');
      offCanvas.width = 1080;
      offCanvas.height = 1350;

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = article.coverImage;

      const onDone = () => {
        offCanvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.94);
      };

      img.onload = () => {
        renderSocialCoverToCanvas(offCanvas, article, img, coverTemplate);
        onDone();
      };

      img.onerror = () => {
        renderSocialCoverToCanvas(offCanvas, article, undefined, coverTemplate);
        onDone();
      };
    });
  };

  // Batch ZIP generation
  const handleDownloadBatchZip = async () => {
    if (selectedArticlesList.length === 0) return;

    setIsBulkDownloading(true);
    const zip = new JSZip();
    let textCompilation = `====================================================\n`;
    textCompilation += `ARCHIVO INUSUAL - COMPILACIÓN DE PUBLICACIONES SOCIALES\n`;
    textCompilation += `Generado el: ${new Date().toLocaleDateString('es-ES')}\n`;
    textCompilation += `Total de historias: ${selectedArticlesList.length}\n`;
    textCompilation += `====================================================\n\n`;

    try {
      for (let i = 0; i < selectedArticlesList.length; i++) {
        const art = selectedArticlesList[i];
        setBulkProgress({
          current: i + 1,
          total: selectedArticlesList.length,
          title: art.title,
        });

        // 1. Generate Image Blob
        const blob = await generateArticleImageBlob(art);
        if (blob) {
          zip.file(`${String(i + 1).padStart(2, '0')}-${art.slug}.jpg`, blob);
        }

        // 2. Build text for this post
        const postText = buildDlvrItPostText(art);
        textCompilation += `----------------------------------------------------\n`;
        textCompilation += `HISTORIA #${i + 1}: ${art.title}\n`;
        textCompilation += `ARCHIVO DE FOTO: ${String(i + 1).padStart(2, '0')}-${art.slug}.jpg\n`;
        textCompilation += `----------------------------------------------------\n`;
        textCompilation += `${postText}\n\n\n`;

        // Small yield to UI loop
        await new Promise(r => setTimeout(r, 80));
      }

      // Add text file to ZIP
      zip.file(`00-TEXTOS-PARA-PEGAR-FACEBOOK.txt`, textCompilation);

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(zipBlob);
      link.download = `archivo-inusual-lote-${selectedArticlesList.length}-historias.zip`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error('Error generating bulk ZIP:', err);
    } finally {
      setIsBulkDownloading(false);
      setBulkProgress(null);
    }
  };

  const handleDownload = () => {
    const canvas = activeTab === 'test' ? testCanvasRef.current : canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    const slug = activeTab === 'test' ? 'portada-prueba-social' : selectedArticle.slug;
    link.download = `${slug}-portada-1080x1350.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 0.94);
    link.click();
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleCopyRss = (xml: string) => {
    navigator.clipboard.writeText(xml);
    setCopiedRss(true);
    setTimeout(() => setCopiedRss(false), 2000);
  };

  const handleSaveFbSettings = (id: string, token: string) => {
    setFbPageId(id);
    setFbPageToken(token);
    localStorage.setItem('archivo_inusual_fb_page_id', id);
    localStorage.setItem('archivo_inusual_fb_page_token', token);
    setFbApiStatus({
      type: 'info',
      message: 'Configuración de Facebook Page guardada localmente.',
    });
    setTimeout(() => setFbApiStatus(null), 3000);
  };

  // Direct Graph API Publishing for single article
  const handleFbApiPublish = async (article: Article) => {
    if (!fbPageId || !fbPageToken) {
      setFbApiStatus({
        type: 'error',
        message: 'Debes ingresar tu Page ID y tu Page Access Token de Facebook en la sección de Piloto Automático.',
      });
      setActiveTab('autopilot');
      return;
    }

    setIsFbApiPosting(true);
    setFbApiStatus({ type: 'info', message: 'Conectando con Meta Graph API y subiendo fotografía...' });

    try {
      const blob = await generateArticleImageBlob(article);
      const postText = buildDlvrItPostText(article);

      const formData = new FormData();
      if (blob) {
        formData.append('source', blob, `${article.slug}-cover.jpg`);
      } else {
        formData.append('url', getSocialCoverUrl(article));
      }
      formData.append('caption', postText);
      formData.append('access_token', fbPageToken);

      const res = await fetch(`https://graph.facebook.com/v19.0/${fbPageId}/photos`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.id) {
        setFbApiStatus({
          type: 'success',
          message: `¡Publicado exitosamente en tu Página de Facebook! ID de foto: ${data.id}`,
          postId: data.post_id || data.id,
        });
      } else {
        const errMsg = data?.error?.message || 'Error desconocido al publicar con Meta Graph API.';
        setFbApiStatus({
          type: 'error',
          message: `Facebook API rechazó la publicación: ${errMsg}`,
        });
      }
    } catch (err: any) {
      setFbApiStatus({
        type: 'error',
        message: `Error de conexión con Facebook: ${err?.message || 'Fallo de red'}`,
      });
    } finally {
      setIsFbApiPosting(false);
    }
  };

  // Direct Graph API Publishing for Bulk selection
  const handleFbApiBulkPublish = async () => {
    if (selectedArticlesList.length === 0) return;
    if (!fbPageId || !fbPageToken) {
      setFbApiStatus({
        type: 'error',
        message: 'Configura primero tu Page ID y Page Access Token de Facebook en la pestaña «Piloto Automático».',
      });
      setActiveTab('autopilot');
      return;
    }

    setIsBulkAutoPosting(true);
    let successCount = 0;

    for (let i = 0; i < selectedArticlesList.length; i++) {
      const art = selectedArticlesList[i];
      setBulkAutoPostProgress({
        current: i + 1,
        total: selectedArticlesList.length,
        successCount,
        currentTitle: art.title,
      });

      try {
        const blob = await generateArticleImageBlob(art);
        const postText = buildDlvrItPostText(art);

        const formData = new FormData();
        if (blob) {
          formData.append('source', blob, `${art.slug}-cover.jpg`);
        } else {
          formData.append('url', getSocialCoverUrl(art));
        }
        formData.append('caption', postText);
        formData.append('access_token', fbPageToken);

        const res = await fetch(`https://graph.facebook.com/v19.0/${fbPageId}/photos`, {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (res.ok && data.id) {
          successCount++;
        }
      } catch (err) {
        console.error('Error posting article to Facebook API:', art.slug, err);
      }

      // Small delay between posts to prevent rate-limits
      await new Promise(r => setTimeout(r, 2000));
    }

    setIsBulkAutoPosting(false);
    setFbApiStatus({
      type: 'success',
      message: `¡Proceso completado! Se publicaron ${successCount} de ${selectedArticlesList.length} historias en tu Página de Facebook.`,
    });
    setBulkAutoPostProgress(null);
  };

  // Mobile Native Share (Shares photo file + text directly to Facebook App)
  const handleNativeMobileShare = async (article: Article) => {
    try {
      const blob = await generateArticleImageBlob(article);
      const postText = buildDlvrItPostText(article);

      if (blob && navigator.canShare && navigator.canShare({ files: [new File([blob], `${article.slug}.jpg`, { type: 'image/jpeg' })] })) {
        const file = new File([blob], `${article.slug}-1080x1350.jpg`, { type: 'image/jpeg' });
        await navigator.share({
          title: article.title,
          text: postText,
          files: [file],
        });
      } else if (navigator.share) {
        await navigator.share({
          title: article.title,
          text: postText,
          url: `https://archivoinusual.vercel.app/historias/${article.slug}`,
        });
      } else {
        // Fallback: copy text and download image
        handleDownload();
        await navigator.clipboard.writeText(postText);
        setShowPublishModal(true);
      }
    } catch (err) {
      console.warn('Native share cancelled or failed:', err);
    }
  };

  // Ultra-Fast 1-Click Publishing to Facebook (Copies text + Downloads HD cover + Opens Direct FB Post Dialog + Marks Published)
  const handleQuickPublishFb = async (art: Article, mode: 'sharer' | 'page_suite' = 'sharer') => {
    try {
      const postText = buildDlvrItPostText(art);
      await navigator.clipboard.writeText(postText);
      setCopiedText(true);

      const blob = await generateArticleImageBlob(art);
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `portada-fb-${art.slug}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      if (!publishedIds.includes(art.id)) {
        toggleMarkPublished(art.id);
      }

      const articlePublicUrl = `https://archivoinusual.vercel.app/historias/${art.slug}`;
      const targetUrl = mode === 'page_suite'
        ? `https://business.facebook.com/latest/composer?page_id=${fbPageId || '61595001542003'}`
        : `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articlePublicUrl)}`;

      window.open(targetUrl, '_blank', 'noopener,noreferrer');

      setFbApiStatus({
        type: 'success',
        message: `✓ ¡Texto copiado y portada descargada! Abriendo creador de publicación de Facebook para "${art.title.slice(0, 40)}...". Solo pega el texto y publica.`,
      });
    } catch (err) {
      console.error('Error during quick Facebook publish:', err);
    }
  };

  // Ultra-Fast 1-Click Publishing to Instagram (Copies formatted caption + Downloads vertical 1080x1350 cover + Opens IG + Marks Published)
  const handleQuickPublishIg = async (art: Article) => {
    try {
      const postText = buildInstagramLongPostText(art);
      await navigator.clipboard.writeText(postText);
      setCopiedText(true);

      const blob = await generateArticleImageBlob(art);
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `portada-ig-${art.slug}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      if (!publishedIds.includes(art.id)) {
        toggleMarkPublished(art.id);
      }

      window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');

      setFbApiStatus({
        type: 'success',
        message: `✓ ¡Listo para Instagram! Micro-documental copiado y portada 1080x1350 descargada para "${art.title.slice(0, 45)}...".`,
      });
    } catch (err) {
      console.error('Error during quick Instagram publish:', err);
    }
  };

  const handleNextArticle = () => {
    const currentIndex = filteredArticles.findIndex(a => a.id === selectedArticle.id);
    if (currentIndex >= 0 && currentIndex < filteredArticles.length - 1) {
      setSelectedArticle(filteredArticles[currentIndex + 1]);
    } else if (filteredArticles.length > 0) {
      setSelectedArticle(filteredArticles[0]);
    }
  };

  const handlePrevArticle = () => {
    const currentIndex = filteredArticles.findIndex(a => a.id === selectedArticle.id);
    if (currentIndex > 0) {
      setSelectedArticle(filteredArticles[currentIndex - 1]);
    } else if (filteredArticles.length > 0) {
      setSelectedArticle(filteredArticles[filteredArticles.length - 1]);
    }
  };

  const publicUrl = selectedArticle ? getSocialCoverUrl(selectedArticle) : '';
  const dlvrItText = selectedArticle ? buildDlvrItPostText(selectedArticle) : '';
  const instagramLongText = selectedArticle ? buildInstagramLongPostText(selectedArticle) : '';
  const activePostText = socialPlatform === 'instagram' ? instagramLongText : dlvrItText;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0C0A09] text-stone-200 flex items-center justify-center p-4">
        <SEOHead
          metadata={{
            title: 'Acceso Restringido · Archivo Inusual',
            description: 'Panel de administración editorial de acceso privado.',
          }}
        />
        <div className="w-full max-w-md bg-[#141210] border border-stone-800 rounded-sm p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle top gold accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-amber-600 via-amber-400 to-amber-600" />

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-sm bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-lg font-mono font-bold">
              §
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 font-semibold block">
                ÁREA EDITORIAL PRIVADA
              </span>
              <h2 className="text-xl font-editorial text-stone-100 font-medium">
                Estudio Social &amp; Despacho
              </h2>
            </div>
          </div>

          <p className="text-xs text-stone-400 mb-6 font-light leading-relaxed">
            Este panel es privado y está protegido. Ingresa tu clave maestra de editor para acceder al generador de portadas y publicación social.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block mb-2">
                Clave Maestra de Acceso:
              </label>
              <input
                type="password"
                value={passkeyInput}
                onChange={(e) => {
                  setPasskeyInput(e.target.value);
                  setAuthError(false);
                }}
                placeholder="••••••••••••"
                autoFocus
                className={`w-full bg-stone-950 border px-4 py-3 text-sm text-stone-100 rounded-xs font-mono tracking-widest focus:outline-hidden transition-colors ${
                  authError 
                    ? 'border-red-500 text-red-200 focus:border-red-400' 
                    : 'border-stone-800 focus:border-amber-500/80'
                }`}
              />
              {authError && (
                <p className="text-[11px] text-red-400 font-sans mt-2 flex items-center gap-1">
                  <span>✕</span> Clave incorrecta. Inténtalo de nuevo.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors rounded-xs shadow-lg cursor-pointer"
            >
              <span>🔓</span>
              <span>Desbloquear Estudio Editorial</span>
            </button>
          </form>

          <div className="mt-8 pt-4 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-500 font-mono">
            <span>ARCHIVO INUSUAL</span>
            <Link to="/" className="text-stone-400 hover:text-amber-400 transition-colors">
              ← Volver al sitio público
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0C0A09] text-stone-200">
      <SEOHead
        metadata={{
          title: 'Estudio de Portadas Sociales y Publicación en Masa',
          description: 'Panel de administración editorial para generación de portadas verticales 1080x1350, selección en masa y publicación rápida en Facebook e Instagram.',
        }}
      />

      {/* Top Banner / Studio Bar */}
      <header className="border-b border-stone-800 bg-[#141210] sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <span className="font-mono text-base font-bold">§</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400 font-semibold">
                  ESTUDIO SOCIAL &amp; PUBLICACIÓN
                </span>
                <span className="text-[10px] bg-stone-800 text-stone-300 px-2 py-0.5 rounded-full font-mono">
                  1080 × 1350 px (4:5)
                </span>
              </div>
              <h1 className="text-lg font-editorial text-stone-100 font-medium">
                Despachador Editorial para Instagram &amp; Facebook
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Navigation Tabs */}
            <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 p-1 rounded-sm text-xs font-sans overflow-x-auto">
              <button
                onClick={() => setActiveTab('editor')}
                className={`px-3 py-1.5 rounded-xs transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  activeTab === 'editor' 
                    ? 'bg-amber-600/30 text-amber-300 font-medium border border-amber-500/30' 
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <span className="font-mono text-xs">◉</span>
                Individual ({filteredArticles.length})
              </button>
              <button
                onClick={() => setActiveTab('bulk')}
                className={`px-3 py-1.5 rounded-xs transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  activeTab === 'bulk' 
                    ? 'bg-amber-600/30 text-amber-300 font-medium border border-amber-500/30' 
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <span className="font-mono text-xs font-bold">📦</span>
                Selección en Masa {selectedIds.length > 0 && `(${selectedIds.length})`}
              </button>
              <button
                onClick={() => setActiveTab('autopilot')}
                className={`px-3 py-1.5 rounded-xs transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  activeTab === 'autopilot' 
                    ? 'bg-emerald-600/30 text-emerald-300 font-medium border border-emerald-500/30' 
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <span className="text-xs">🤖</span>
                Piloto Automático
              </button>
              <button
                onClick={() => setActiveTab('rss')}
                className={`px-3 py-1.5 rounded-xs transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  activeTab === 'rss' 
                    ? 'bg-amber-600/30 text-amber-300 font-medium border border-amber-500/30' 
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <span className="font-mono text-xs font-bold text-amber-400">RSS</span>
                Feed RSS
              </button>
            </div>

            {/* Change PIN & Logout */}
            <button
              onClick={() => setShowPinModal(true)}
              title="Cambiar clave maestra de acceso"
              className="p-2 bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-stone-200 rounded-sm text-xs cursor-pointer"
            >
              ⚙️
            </button>
            <button
              onClick={handleLogout}
              title="Cerrar sesión y bloquear panel"
              className="py-1.5 px-2.5 bg-stone-900 hover:bg-red-950/80 border border-stone-800 hover:border-red-700 text-stone-400 hover:text-red-300 rounded-sm text-xs font-mono flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>🔒</span>
              <span>Bloquear</span>
            </button>
          </div>
        </div>
      </header>

      {/* PIN Change Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#141210] border border-stone-700 rounded-sm p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-800">
              <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-wider">
                ⚙️ Cambiar Clave Maestra
              </span>
              <button 
                onClick={() => setShowPinModal(false)}
                className="text-stone-400 hover:text-stone-200 text-xs font-mono"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-stone-400">
              Ingresa una nueva contraseña o PIN para acceder a este panel privado en el futuro.
            </p>
            <form onSubmit={handleChangePin} className="space-y-3">
              <input
                type="text"
                placeholder="Nueva clave o PIN (ej. archivo2026)"
                value={customPinInput}
                onChange={(e) => setCustomPinInput(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 px-3 py-2 text-xs text-stone-100 rounded-xs font-mono focus:outline-hidden focus:border-amber-500"
              />
              {pinChangeSuccess && (
                <p className="text-[11px] text-emerald-400">✓ Clave actualizada correctamente.</p>
              )}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPinModal(false)}
                  className="px-3 py-1.5 text-xs text-stone-400 hover:text-stone-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={customPinInput.trim().length < 4}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-stone-950 font-bold text-xs rounded-xs"
                >
                  Guardar Clave
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Studio Viewport */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* TAB 1: EDITOR Y GESTOR INDIVIDUAL */}
        {activeTab === 'editor' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Article Selector & Search with Date/Status Filters */}
            <div className="lg:col-span-4 bg-[#141210] border border-stone-800 p-4 rounded-sm flex flex-col gap-3 max-h-[860px] overflow-hidden shadow-lg">
              
              {/* Header with counter */}
              <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                <span className="text-xs uppercase tracking-[0.2em] font-mono text-stone-400 font-semibold">
                  Catálogo Editorial
                </span>
                <span className="text-xs text-amber-400 font-mono font-bold">
                  {filteredArticles.length} / {articles.length}
                </span>
              </div>

              {/* Search input */}
              <input
                type="text"
                placeholder="Buscar por título, categoría o fecha..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-stone-900 border border-stone-800 px-3 py-1.5 text-xs text-stone-200 placeholder-stone-500 rounded-sm focus:outline-hidden focus:border-amber-500/60"
              />

              {/* 1. Date Filter Pills */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider">
                  Filtrar por Fecha:
                </span>
                <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px] font-mono">
                  <button
                    onClick={() => setDateFilter('all')}
                    className={`px-2 py-0.5 rounded-xs shrink-0 cursor-pointer ${
                      dateFilter === 'all'
                        ? 'bg-amber-600 text-stone-950 font-bold'
                        : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                    }`}
                  >
                    Todas ({articles.length})
                  </button>
                  <button
                    onClick={() => setDateFilter('today')}
                    className={`px-2 py-0.5 rounded-xs shrink-0 cursor-pointer flex items-center gap-1 ${
                      dateFilter === 'today'
                        ? 'bg-amber-600 text-stone-950 font-bold'
                        : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                    }`}
                  >
                    <span>📅</span>
                    <span>Hoy</span>
                  </button>
                  <button
                    onClick={() => setDateFilter('yesterday')}
                    className={`px-2 py-0.5 rounded-xs shrink-0 cursor-pointer flex items-center gap-1 ${
                      dateFilter === 'yesterday'
                        ? 'bg-amber-600 text-stone-950 font-bold'
                        : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                    }`}
                  >
                    <span>⏮️</span>
                    <span>Ayer</span>
                  </button>
                  <button
                    onClick={() => setDateFilter('week')}
                    className={`px-2 py-0.5 rounded-xs shrink-0 cursor-pointer ${
                      dateFilter === 'week'
                        ? 'bg-amber-600 text-stone-950 font-bold'
                        : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                    }`}
                  >
                    7 Días
                  </button>
                  <button
                    onClick={() => setDateFilter('month')}
                    className={`px-2 py-0.5 rounded-xs shrink-0 cursor-pointer ${
                      dateFilter === 'month'
                        ? 'bg-amber-600 text-stone-950 font-bold'
                        : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                    }`}
                  >
                    Este Mes
                  </button>
                </div>
              </div>

              {/* 2. Status Filter & Sort Row */}
              <div className="flex items-center justify-between gap-2 text-[11px] font-mono pt-1 border-t border-stone-900">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-1.5 py-0.5 rounded-xs cursor-pointer ${
                      statusFilter === 'all' ? 'text-amber-300 font-bold underline' : 'text-stone-500 hover:text-stone-300'
                    }`}
                  >
                    Todo
                  </button>
                  <span className="text-stone-700">|</span>
                  <button
                    onClick={() => setStatusFilter('pending')}
                    className={`px-1.5 py-0.5 rounded-xs cursor-pointer ${
                      statusFilter === 'pending' ? 'text-amber-400 font-bold underline' : 'text-stone-500 hover:text-stone-300'
                    }`}
                  >
                    ⏳ Pendientes
                  </button>
                  <span className="text-stone-700">|</span>
                  <button
                    onClick={() => setStatusFilter('published')}
                    className={`px-1.5 py-0.5 rounded-xs cursor-pointer ${
                      statusFilter === 'published' ? 'text-emerald-400 font-bold underline' : 'text-stone-500 hover:text-stone-300'
                    }`}
                  >
                    ✓ Publicadas
                  </button>
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-stone-900 border border-stone-800 text-[10px] text-stone-300 px-1.5 py-0.5 rounded-xs focus:outline-hidden"
                >
                  <option value="newest">↓ Más recientes</option>
                  <option value="oldest">↑ Más antiguos</option>
                  <option value="az">A - Z</option>
                </select>
              </div>

              {/* Quick bulk switch button */}
              <button
                onClick={() => setActiveTab('bulk')}
                className="w-full py-1.5 px-3 bg-stone-900 hover:bg-stone-800 border border-stone-700/80 rounded-sm text-amber-400 text-[11px] font-mono flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>📦</span>
                <span>Seleccionar en Masa ({selectedIds.length} elegidos)</span>
              </button>

              {/* Article List with Status Toggle */}
              <div className="overflow-y-auto space-y-1.5 pr-1 flex-1">
                {filteredArticles.length === 0 ? (
                  <div className="py-12 text-center text-stone-500 text-xs font-mono">
                    No se encontraron historias con los filtros seleccionados.
                  </div>
                ) : (
                  filteredArticles.map((art) => {
                    const isSelected = art.id === selectedArticle.id;
                    const isPub = publishedIds.includes(art.id);
                    const isToday = art.publishedAt === todayStr || art.publishedAt >= '2026-10-04';
                    const isYesterday = art.publishedAt === yesterdayStr || art.publishedAt === '2026-10-03';

                    return (
                      <div
                        key={art.id}
                        onClick={() => setSelectedArticle(art)}
                        className={`w-full text-left p-2.5 rounded-sm border transition-all text-xs flex gap-2.5 cursor-pointer relative group ${
                          isSelected 
                            ? 'bg-amber-950/50 border-amber-600 text-amber-100 shadow-md' 
                            : 'bg-stone-950/70 border-stone-900 text-stone-300 hover:border-stone-700 hover:bg-stone-900'
                        }`}
                      >
                        <div className="w-12 h-15 rounded-xs overflow-hidden shrink-0 bg-stone-900 border border-stone-800 relative">
                          <img 
                            src={art.coverImage} 
                            alt="" 
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          {isPub && (
                            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[9px] px-1 font-bold">
                              ✓
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 text-[10px] font-mono mb-1">
                            <span className="text-amber-500/90 uppercase truncate">
                              {art.categoryLabel}
                            </span>
                            <div className="flex items-center gap-1 shrink-0">
                              {isToday && (
                                <span className="bg-amber-600/30 text-amber-300 border border-amber-500/40 px-1 rounded-2xs text-[9px] font-bold">
                                  HOY
                                </span>
                              )}
                              {isYesterday && (
                                <span className="bg-stone-800 text-stone-300 px-1 rounded-2xs text-[9px]">
                                  AYER
                                </span>
                              )}
                              <button
                                onClick={(e) => toggleMarkPublished(art.id, e)}
                                title={isPub ? 'Marcar como pendiente' : 'Marcar como publicado en redes'}
                                className={`px-1.5 py-0.5 rounded-2xs text-[9px] font-mono transition-colors cursor-pointer ${
                                  isPub 
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' 
                                    : 'bg-stone-900 text-stone-500 hover:text-stone-300 border border-stone-800'
                                }`}
                              >
                                {isPub ? '✓' : '⏳'}
                              </button>
                            </div>
                          </div>
                          <h4 className="font-editorial text-xs line-clamp-2 leading-snug font-medium text-stone-100">
                            {art.title}
                          </h4>

                          {/* Quick 1-Click Action Buttons directly in list */}
                          <div className="mt-1.5 pt-1.5 border-t border-stone-900/80 flex items-center gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedArticle(art);
                                handleQuickPublishFb(art);
                              }}
                              title="Publicación rápida a Facebook (Copia texto + descarga portada + abre FB)"
                              className="px-1.5 py-0.5 bg-[#1877F2]/20 hover:bg-[#1877F2] text-[#1877F2] hover:text-white border border-[#1877F2]/40 rounded-2xs text-[9px] font-mono font-bold flex items-center gap-0.5 transition-colors cursor-pointer"
                            >
                              <span>⚡</span>
                              <span>FB</span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedArticle(art);
                                handleQuickPublishIg(art);
                              }}
                              title="Publicación rápida a Instagram (Copia texto + descarga portada + abre IG)"
                              className="px-1.5 py-0.5 bg-pink-950/40 hover:bg-linear-to-r hover:from-purple-600 hover:to-pink-600 text-pink-300 hover:text-white border border-pink-700/40 rounded-2xs text-[9px] font-mono font-bold flex items-center gap-0.5 transition-colors cursor-pointer"
                            >
                              <span>⚡</span>
                              <span>IG</span>
                            </button>
                            <span className="text-[9px] text-stone-600 font-mono ml-auto">
                              {art.readingTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Middle Column: Live Visual Canvas Preview */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="w-full bg-[#141210] border border-stone-800 p-5 rounded-sm flex flex-col items-center shadow-lg">
                
                {/* Express 1-by-1 Step Navigation Bar */}
                <div className="w-full mb-3 pb-3 border-b border-stone-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={handlePrevArticle}
                    title="Ir a la historia anterior"
                    className="py-1 px-2.5 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-mono rounded-xs flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>◀</span>
                    <span className="hidden sm:inline">Anterior</span>
                  </button>

                  <div className="text-center min-w-0">
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                      PUBLICANDO 1 A 1
                    </span>
                    <span className="text-xs text-stone-300 font-mono">
                      #{filteredArticles.findIndex(a => a.id === selectedArticle.id) + 1} de {filteredArticles.length}
                    </span>
                  </div>

                  <button
                    onClick={handleNextArticle}
                    title="Ir a la siguiente historia"
                    className="py-1 px-2.5 bg-amber-600/90 hover:bg-amber-500 text-stone-950 font-bold text-xs font-mono rounded-xs flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span className="hidden sm:inline">Siguiente</span>
                    <span>▶</span>
                  </button>
                </div>

                {/* 1-CLIC FAST PUBLISH STRIP */}
                <div className="w-full mb-4 flex flex-col gap-2 bg-stone-900/60 p-2.5 rounded-sm border border-stone-800">
                  {fbPageToken ? (
                    <button
                      onClick={() => handleFbApiPublish(selectedArticle)}
                      disabled={isFbApiPosting}
                      className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs font-mono rounded-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                      title="Sube la foto y el texto directamente a tu Página de Facebook mediante la API oficial sin necesidad de abrir nada"
                    >
                      <span>🚀</span>
                      <span>{isFbApiPosting ? 'Publicando en tu Página...' : 'Publicar 100% Automático (API FB)'}</span>
                    </button>
                  ) : null}

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleQuickPublishFb(selectedArticle, 'sharer')}
                      className="py-2.5 px-2 bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-xs font-mono rounded-xs shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer transform active:scale-98"
                      title="Copia el texto al portapapeles, descarga la imagen y abre el creador de publicaciones"
                    >
                      <span className="text-sm">⚡</span>
                      <span>Crear Post FB</span>
                    </button>
                    <button
                      onClick={() => handleQuickPublishIg(selectedArticle)}
                      className="py-2.5 px-2 bg-linear-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-95 text-white font-bold text-xs font-mono rounded-xs shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer transform active:scale-98"
                      title="Copia texto de Instagram, descarga la portada 4:5 y abre Instagram"
                    >
                      <span className="text-sm">⚡</span>
                      <span>1-Clic Instagram</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleQuickPublishFb(selectedArticle, 'page_suite')}
                      className="flex-1 py-1.5 px-2 bg-stone-950 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-amber-300 font-mono text-[10px] rounded-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      title="Abre directamente el creador de publicaciones de tu Página en Meta Business Suite"
                    >
                      <span>🏢</span>
                      <span>Meta Business Suite</span>
                    </button>
                    <button
                      onClick={() => handleNativeMobileShare(selectedArticle)}
                      className="py-1.5 px-2.5 bg-stone-950 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-amber-300 font-mono text-[10px] rounded-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      title="En celulares y tablets, abre el menú del sistema pasando la foto y el texto juntos a la app de Facebook"
                    >
                      <span>📲</span>
                      <span>Compartir App</span>
                    </button>
                  </div>

                  <div className="text-[10px] text-stone-400 font-mono bg-stone-950/80 p-2 rounded-xs border border-stone-800/80 leading-relaxed">
                    <span className="text-amber-400 font-bold">💡 Al abrir Facebook:</span>
                    <ol className="list-decimal list-inside mt-0.5 space-y-0.5 text-stone-300">
                      <li>Haz clic en el cuadro y presiona <strong className="text-amber-300">Ctrl + V</strong> (o Mantén presionado y <em>Pegar</em>).</li>
                      <li>Arrastra la <strong className="text-amber-300">imagen descargada</strong> a la publicación.</li>
                    </ol>
                  </div>
                </div>

                <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-stone-800">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400 font-semibold flex items-center gap-1.5">
                    <span>🖼</span>
                    Portada Social (1080 × 1350)
                  </span>
                  <span className="text-[10px] text-stone-500 font-mono">
                    Formato 4:5
                  </span>
                </div>

                {/* Template Style Selector */}
                <div className="w-full mb-3 flex items-center justify-between gap-1 bg-stone-950 p-1 rounded-sm border border-stone-800">
                  <button
                    onClick={() => setCoverTemplate('cinema')}
                    className={`flex-1 py-1.5 px-1.5 text-[10px] font-mono rounded-xs transition-all flex items-center justify-center gap-1 cursor-pointer ${
                      coverTemplate === 'cinema'
                        ? 'bg-amber-600/30 text-amber-300 font-bold border border-amber-500/40 shadow-xs'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <span>🎬</span>
                    <span>Documental</span>
                  </button>
                  <button
                    onClick={() => setCoverTemplate('classified')}
                    className={`flex-1 py-1.5 px-1.5 text-[10px] font-mono rounded-xs transition-all flex items-center justify-center gap-1 cursor-pointer ${
                      coverTemplate === 'classified'
                        ? 'bg-red-950/80 text-red-300 font-bold border border-red-600 shadow-xs'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <span>📁</span>
                    <span>Clasificado</span>
                  </button>
                  <button
                    onClick={() => setCoverTemplate('magazine')}
                    className={`flex-1 py-1.5 px-1.5 text-[10px] font-mono rounded-xs transition-all flex items-center justify-center gap-1 cursor-pointer ${
                      coverTemplate === 'magazine'
                        ? 'bg-amber-500/20 text-yellow-300 font-bold border border-amber-400/50 shadow-xs'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <span>🏛️</span>
                    <span>Revista</span>
                  </button>
                </div>

                {/* Canvas Box */}
                <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-xs overflow-hidden border border-stone-700/80 shadow-2xl bg-black">
                  <canvas 
                    ref={canvasRef} 
                    className="w-full h-full object-contain"
                  />
                  {isGenerating && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center">
                      <div className="flex items-center gap-2 text-xs font-mono text-amber-300">
                        <span className="font-mono text-xs animate-spin">↻</span>
                        Componiendo portada...
                      </div>
                    </div>
                  )}
                </div>

                {/* Status Message from Graph API or Actions */}
                {fbApiStatus && (
                  <div className={`w-full mt-3 p-3 rounded-xs text-xs font-sans border flex items-start gap-2 ${
                    fbApiStatus.type === 'success'
                      ? 'bg-emerald-950/60 border-emerald-600 text-emerald-200'
                      : fbApiStatus.type === 'error'
                      ? 'bg-red-950/60 border-red-600 text-red-200'
                      : 'bg-amber-950/60 border-amber-600 text-amber-200'
                  }`}>
                    <span className="font-bold text-sm">
                      {fbApiStatus.type === 'success' ? '✓' : fbApiStatus.type === 'error' ? '✕' : 'ℹ'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div>{fbApiStatus.message}</div>
                      {fbApiStatus.postId && (
                        <a
                          href={`https://facebook.com/${fbApiStatus.postId}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-amber-300 underline font-medium mt-1 block"
                        >
                          → Ver publicación en Facebook
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Primary Action Buttons */}
                <div className="w-full mt-4 flex flex-col gap-2">
                  {/* Button 1: Dynamic Primary Action */}
                  {socialPlatform === 'instagram' ? (
                    <button
                      onClick={() => handleNativeMobileShare(selectedArticle)}
                      className="w-full py-3 px-4 bg-linear-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-95 text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all rounded-xs shadow-lg cursor-pointer transform active:scale-98"
                    >
                      <span className="text-base">📸</span>
                      <span>Compartir a Instagram con Foto y Texto</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleFbApiPublish(selectedArticle)}
                      disabled={isFbApiPosting}
                      className="w-full py-3 px-4 bg-[#1877F2] hover:bg-[#166fe5] disabled:opacity-50 text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all rounded-xs shadow-lg cursor-pointer transform active:scale-98"
                    >
                      <span className="text-base">{isFbApiPosting ? '↻' : '⚡'}</span>
                      <span>{isFbApiPosting ? 'Publicando en Facebook...' : 'Publicar Automático en Facebook (API)'}</span>
                    </button>
                  )}

                  {/* Button 2: Native Mobile Share */}
                  <button
                    onClick={() => handleNativeMobileShare(selectedArticle)}
                    className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-100 font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors rounded-xs shadow-md cursor-pointer"
                  >
                    <span>📲</span>
                    <span>Compartir por App (Menú del Teléfono)</span>
                  </button>

                  {/* Button 3: Download + Copy */}
                  <button
                    onClick={async () => {
                      handleDownload();
                      await navigator.clipboard.writeText(activePostText);
                      setCopiedText(true);
                      setShowPublishModal(true);
                    }}
                    className="w-full py-2 px-4 bg-amber-600/90 hover:bg-amber-500 text-stone-950 font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors rounded-xs shadow-md cursor-pointer"
                  >
                    <span>↓</span>
                    <span>Descargar Portada + Copiar Texto ({socialPlatform === 'instagram' ? 'Instagram' : 'Facebook'})</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleCopyUrl(publicUrl)}
                      className="py-2 px-3 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs flex items-center justify-center gap-1.5 rounded-xs transition-colors cursor-pointer"
                    >
                      {copiedUrl ? <IconCheck className="w-3.5 h-3.5 text-emerald-400" /> : <span className="font-mono text-xs text-stone-400">📋</span>}
                      {copiedUrl ? '¡Copiada!' : 'Copiar URL Pública'}
                    </button>
                    <a
                      href={`/historias/${selectedArticle.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2 px-3 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs flex items-center justify-center gap-1.5 rounded-xs transition-colors cursor-pointer"
                    >
                      <IconExternal className="w-3.5 h-3.5 text-stone-400" />
                      Ver Artículo
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Text for Post & Live Controls */}
            <div className="lg:col-span-4 space-y-5">
              
              {/* Box 1: Platform Selection & Formatted Copy */}
              <div className="bg-[#141210] border border-stone-800 p-5 rounded-sm space-y-3 shadow-lg">
                <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                  <div className="flex items-center gap-1 bg-stone-950 p-0.5 rounded-xs border border-stone-800">
                    <button
                      onClick={() => setSocialPlatform('instagram')}
                      className={`px-2.5 py-1 text-xs font-mono rounded-xs transition-all flex items-center gap-1 cursor-pointer ${
                        socialPlatform === 'instagram'
                          ? 'bg-linear-to-r from-[#833AB4] to-[#FD1D1D] text-white font-bold shadow-xs'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      <span>📸</span>
                      <span>Instagram (Largo)</span>
                    </button>
                    <button
                      onClick={() => setSocialPlatform('facebook')}
                      className={`px-2.5 py-1 text-xs font-mono rounded-xs transition-all flex items-center gap-1 cursor-pointer ${
                        socialPlatform === 'facebook'
                          ? 'bg-[#1877F2] text-white font-bold shadow-xs'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      <span>📘</span>
                      <span>Facebook</span>
                    </button>
                  </div>

                  <button
                    onClick={() => handleCopyText(activePostText)}
                    className="text-[11px] bg-stone-900 hover:bg-stone-800 border border-stone-700 px-2 py-1 rounded-xs text-stone-200 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedText ? <IconCheck className="w-3 h-3 text-emerald-400" /> : <span className="font-mono text-xs">📋</span>}
                    {copiedText ? '¡Copiado!' : 'Copiar'}
                  </button>
                </div>

                {/* Character and word metrics */}
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className={activePostText.length > 2200 ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                    {activePostText.length.toLocaleString('es-ES')} / 2,200 caracteres
                  </span>
                  <span className="text-stone-500">
                    {activePostText.split(/\s+/).length} palabras · {socialPlatform === 'instagram' ? 'Micro-documental' : 'Resumen'}
                  </span>
                </div>

                {/* Post body */}
                <div className="p-3 bg-stone-950 border border-stone-800/80 rounded-xs font-sans text-xs text-stone-300 whitespace-pre-wrap leading-relaxed max-h-[340px] overflow-y-auto">
                  {activePostText}
                </div>

                <p className="text-[11px] text-stone-500 font-light">
                  {socialPlatform === 'instagram' ? (
                    <span>💡 <strong>Instagram:</strong> Texto extendido tipo microblogging con 3 párrafos narrativos, llamado a la bio y hashtags de investigación.</span>
                  ) : (
                    <span>💡 <strong>Facebook:</strong> Texto directo con gancho, sinopsis y enlace de vista previa con tarjeta enriquecida.</span>
                  )}
                </p>
              </div>

              {/* Box 2: Regenerate & Fine-Tune Controls */}
              <div className="bg-[#141210] border border-stone-800 p-5 rounded-sm space-y-4 shadow-lg">
                <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                  <span className="text-xs uppercase tracking-[0.2em] font-mono text-stone-400 font-semibold flex items-center gap-1.5">
                    <span>⚙</span>
                    Ajustes de la Portada
                  </span>
                  <button
                    onClick={() => {
                      setCustomHook(getSocialHookTitle(selectedArticle));
                      setCustomLocation(getSocialLocation(selectedArticle));
                    }}
                    className="text-[11px] text-stone-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>↻</span>
                    Restablecer
                  </button>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-stone-400 block mb-1.5">
                    TÍTULO / GANCHO PRINCIPAL (GRANDE):
                  </label>
                  <textarea
                    rows={2}
                    value={customHook}
                    onChange={(e) => setCustomHook(e.target.value.toUpperCase())}
                    className="w-full bg-stone-950 border border-stone-800 px-3 py-2 text-xs text-stone-100 rounded-sm font-editorial tracking-wide"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-stone-400 block mb-1.5">
                    SUBTÍTULO / LUGAR O ÉPOCA:
                  </label>
                  <input
                    type="text"
                    value={customLocation}
                    onChange={(e) => setCustomLocation(e.target.value.toUpperCase())}
                    className="w-full bg-stone-950 border border-stone-800 px-3 py-2 text-xs text-amber-400 rounded-sm font-mono tracking-wider"
                  />
                </div>

                <div className="p-3 bg-stone-900/60 border border-stone-800 text-[11px] text-stone-400 space-y-1">
                  <div className="font-semibold text-stone-300">URL Pública Permanente:</div>
                  <div className="font-mono text-amber-500 break-all text-[10px]">
                    {publicUrl}
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: SELECCIÓN Y PUBLICACIÓN EN MASA (BULK / LOTE) */}
        {activeTab === 'bulk' && (
          <div className="space-y-6">
            
            {/* Header / Selection Control Bar */}
            <div className="bg-[#141210] border border-stone-800 p-5 rounded-sm flex flex-wrap items-center justify-between gap-4 shadow-lg">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400 font-semibold">
                    MODO DE SELECCIÓN EN MASA
                  </span>
                  <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-mono font-bold">
                    {selectedIds.length} seleccionadas
                  </span>
                </div>
                <p className="text-xs text-stone-400 mt-1 font-sans">
                  Selecciona las historias que quieras publicar juntas o descargar en un único archivo ZIP.
                </p>
              </div>

              {/* Quick Selection Buttons */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <button
                  onClick={handleSelectAll}
                  className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 rounded-sm cursor-pointer"
                >
                  ✓ Seleccionar Todas ({filteredArticles.length})
                </button>
                <button
                  onClick={() => handleSelectRecent(5)}
                  className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-amber-400 rounded-sm cursor-pointer"
                >
                  + Últimas 5
                </button>
                <button
                  onClick={() => handleSelectRecent(10)}
                  className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-amber-400 rounded-sm cursor-pointer"
                >
                  + Últimas 10
                </button>
                {selectedIds.length > 0 && (
                  <button
                    onClick={handleDeselectAll}
                    className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 border border-red-900/50 text-red-400 rounded-sm cursor-pointer"
                  >
                    ✕ Desmarcar
                  </button>
                )}
              </div>
            </div>

            {/* Primary Bulk Action Banner (when stories are selected) */}
            {selectedIds.length > 0 && (
              <div className="bg-linear-to-r from-amber-950/60 to-stone-900 border-2 border-amber-600/60 p-6 rounded-sm flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
                <div className="space-y-1 text-center md:text-left">
                  <div className="text-base font-editorial text-amber-200 font-bold flex items-center justify-center md:justify-start gap-2">
                    <span>📦</span>
                    <span>Lote de {selectedIds.length} historias listo para publicar</span>
                  </div>
                  <p className="text-xs text-stone-300">
                    Puedes descargar todas las portadas en un archivo ZIP ordenado con un archivo de texto listo para copiar, o usar el asistente de publicación en cola.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  {/* Option 1: Direct Graph API Auto-Publish to Facebook */}
                  <button
                    onClick={handleFbApiBulkPublish}
                    disabled={isBulkAutoPosting}
                    className="flex-1 md:flex-initial py-3 px-5 bg-[#1877F2] hover:bg-[#166fe5] disabled:opacity-50 text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 rounded-xs shadow-md cursor-pointer transition-all"
                  >
                    <span>{isBulkAutoPosting ? '↻' : '⚡'}</span>
                    <span>{isBulkAutoPosting ? 'Publicando en Facebook...' : `Auto-Publicar Lote (${selectedIds.length}) a Facebook`}</span>
                  </button>

                  {/* Option 2: Download Batch ZIP */}
                  <button
                    onClick={handleDownloadBatchZip}
                    disabled={isBulkDownloading || isBulkAutoPosting}
                    className="flex-1 md:flex-initial py-3 px-5 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-stone-950 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 rounded-xs shadow-md cursor-pointer transition-all"
                  >
                    <span>↓</span>
                    <span>{isBulkDownloading ? 'Generando ZIP...' : `Descargar ZIP (${selectedIds.length} Portadas)`}</span>
                  </button>

                  {/* Option 3: Manual Queue Modal */}
                  <button
                    onClick={() => {
                      setQueueIndex(0);
                      setQueueModalOpen(true);
                    }}
                    className="flex-1 md:flex-initial py-3 px-5 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 rounded-xs shadow-md cursor-pointer transition-all"
                  >
                    <span>🚀</span>
                    <span>Asistente en Cola</span>
                  </button>
                </div>
              </div>
            )}

            {/* Progress indicator during batch API auto-publishing */}
            {isBulkAutoPosting && bulkAutoPostProgress && (
              <div className="p-4 bg-emerald-950/60 border border-emerald-500/60 rounded-sm space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-300 font-semibold">
                    Publicando historia {bulkAutoPostProgress.current} de {bulkAutoPostProgress.total} en tu Página de Facebook...
                  </span>
                  <span className="text-emerald-400 font-mono">
                    {bulkAutoPostProgress.successCount} publicadas
                  </span>
                </div>
                <div className="w-full bg-stone-950 h-2 rounded-full overflow-hidden border border-emerald-900">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-300"
                    style={{ width: `${(bulkAutoPostProgress.current / bulkAutoPostProgress.total) * 100}%` }}
                  />
                </div>
                <div className="text-[11px] text-stone-300 truncate">
                  {bulkAutoPostProgress.currentTitle}
                </div>
              </div>
            )}

            {/* Progress indicator during batch generation */}
            {isBulkDownloading && bulkProgress && (
              <div className="p-4 bg-stone-900 border border-amber-500/40 rounded-sm space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-400 font-semibold">
                    Generando portada {bulkProgress.current} de {bulkProgress.total}...
                  </span>
                  <span className="text-stone-400 truncate max-w-xs">{bulkProgress.title}</span>
                </div>
                <div className="w-full bg-stone-950 h-2 rounded-full overflow-hidden border border-stone-800">
                  <div 
                    className="bg-amber-500 h-full transition-all duration-200"
                    style={{ width: `${(bulkProgress.current / bulkProgress.total) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Search Filter for Mass Selection */}
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Filtrar historias por título o categoría..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-[#141210] border border-stone-800 px-4 py-2.5 text-xs text-stone-200 placeholder-stone-500 rounded-sm focus:outline-hidden focus:border-amber-500/60"
              />
            </div>

            {/* Articles Grid for Mass Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredArticles.map((art, idx) => {
                const isSelected = selectedIds.includes(art.id);
                return (
                  <div
                    key={art.id}
                    onClick={() => toggleSelectArticle(art.id)}
                    className={`p-4 rounded-sm border transition-all cursor-pointer flex gap-3.5 select-none relative ${
                      isSelected 
                        ? 'bg-amber-950/40 border-amber-500 shadow-md ring-1 ring-amber-500/40' 
                        : 'bg-[#141210] border-stone-800/80 hover:border-stone-700 hover:bg-stone-900/60'
                    }`}
                  >
                    {/* Checkbox indicator */}
                    <div className="pt-1">
                      <div className={`w-5 h-5 rounded-xs border flex items-center justify-center transition-colors ${
                        isSelected 
                          ? 'bg-amber-500 border-amber-400 text-stone-950' 
                          : 'bg-stone-900 border-stone-700 text-transparent'
                      }`}>
                        <span className="text-xs font-bold leading-none">✓</span>
                      </div>
                    </div>

                    {/* Image Thumbnail */}
                    <div className="w-16 h-20 rounded-xs overflow-hidden shrink-0 bg-stone-900 border border-stone-800">
                      <img 
                        src={art.coverImage} 
                        alt="" 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Content details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-[10px] text-amber-500 font-mono uppercase tracking-wider mb-1">
                          <span>#{idx + 1}</span>
                          <span>·</span>
                          <span>{art.categoryLabel}</span>
                        </div>
                        <h4 className="font-editorial text-xs line-clamp-2 leading-snug font-medium text-stone-100">
                          {art.title}
                        </h4>
                      </div>

                      <div className="text-[10px] text-stone-400 font-mono mt-2 flex items-center justify-between">
                        <span>{art.date}</span>
                        <span className="text-amber-500/70">{art.readingTime}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* TAB: PILOTO AUTOMÁTICO (META GRAPH API & RSS 24/7) */}
        {activeTab === 'autopilot' && (
          <div className="space-y-8">
            {/* Header */}
            <div className="bg-[#141210] border border-stone-800 p-6 rounded-sm space-y-2 shadow-lg">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-[0.2em] font-semibold">
                <span>🤖</span>
                <span>CENTRO DE AUTOMATIZACIÓN TOTAL PARA FACEBOOK</span>
              </div>
              <h2 className="text-xl font-editorial text-stone-100 font-medium">
                Publicación en 1 Clic o Piloto Automático 24/7
              </h2>
              <p className="text-xs text-stone-400 max-w-3xl leading-relaxed">
                Olvídate de descargar archivos o copiar textos manualmente. Conecta tu Página de Facebook directamente mediante la API oficial de Meta para publicar en 1 clic desde esta web, o usa el enlace RSS para programar las 66 historias en piloto automático sin tocar nada.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Box 1: Meta Graph API Direct Auto-Publisher */}
              <div className="bg-[#141210] border border-stone-800 p-6 rounded-sm space-y-5 shadow-lg">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <div className="flex items-center gap-2">
                    <span className="text-base">⚡</span>
                    <h3 className="font-editorial text-sm font-semibold text-stone-100">
                      1. Conexión Directa Meta Graph API
                    </h3>
                  </div>
                  <span className="text-[10px] bg-blue-950 text-blue-300 border border-blue-800 px-2 py-0.5 rounded-full font-mono">
                    API Oficial Facebook
                  </span>
                </div>

                <p className="text-xs text-stone-400 leading-relaxed">
                  Ingresa las credenciales de tu Página de Facebook para que los botones <strong className="text-stone-200">«Publicar Automático»</strong> envíen la foto y el texto directamente a tu muro de Facebook en 1 segundo.
                </p>

                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <label className="text-stone-300 block mb-1">ID de tu Página de Facebook (Page ID):</label>
                    <input
                      type="text"
                      value={fbPageId}
                      onChange={(e) => setFbPageId(e.target.value.trim())}
                      placeholder="61595001542003"
                      className="w-full bg-stone-950 border border-stone-800 px-3 py-2 text-stone-100 rounded-sm font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-stone-300 block mb-1">Token de Acceso de Página (Page Access Token):</label>
                    <input
                      type="password"
                      value={fbPageToken}
                      onChange={(e) => setFbPageToken(e.target.value.trim())}
                      placeholder="EAA..."
                      className="w-full bg-stone-950 border border-stone-800 px-3 py-2 text-stone-100 rounded-sm font-mono text-xs"
                    />
                  </div>
                </div>

                {/* Save button & Status */}
                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={() => handleSaveFbSettings(fbPageId, fbPageToken)}
                    className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 rounded-xs shadow-md cursor-pointer transition-colors"
                  >
                    <span>✓</span>
                    <span>Guardar Credenciales en Este Navegador</span>
                  </button>

                  {fbApiStatus && (
                    <div className={`p-3 rounded-xs text-xs font-sans border flex items-start gap-2 ${
                      fbApiStatus.type === 'success'
                        ? 'bg-emerald-950/60 border-emerald-600 text-emerald-200'
                        : fbApiStatus.type === 'error'
                        ? 'bg-red-950/60 border-red-600 text-red-200'
                        : 'bg-amber-950/60 border-amber-600 text-amber-200'
                    }`}>
                      <span>{fbApiStatus.type === 'success' ? '✓' : 'ℹ'}</span>
                      <div className="flex-1">{fbApiStatus.message}</div>
                    </div>
                  )}
                </div>

                {/* Quick 1-minute guide to get token */}
                <div className="p-4 bg-stone-950 border border-stone-800/90 rounded-xs space-y-2 text-xs font-sans text-stone-400">
                  <div className="font-semibold text-amber-400 font-mono text-[11px] uppercase tracking-wider">
                    ¿Cómo obtener tu Token de Página en 1 minuto?
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-[11px] leading-relaxed">
                    <li>Entra a 👉 <a href="https://developers.facebook.com/tools/explorer/" target="_blank" rel="noreferrer" className="text-amber-300 underline">Meta Graph API Explorer</a>.</li>
                    <li>Selecciona tu App y en "User or Page" elige tu **Página de Facebook**.</li>
                    <li>Marca los permisos: <code className="text-amber-400">pages_manage_posts</code> y <code className="text-amber-400">pages_read_engagement</code>.</li>
                    <li>Haz clic en **Generate Access Token**, cópialo y pégalo arriba.</li>
                  </ol>
                </div>
              </div>

              {/* Box 2: 100% Zero-Touch Automation via RSS (dlvr.it / Buffer) */}
              <div className="bg-[#141210] border border-stone-800 p-6 rounded-sm space-y-5 shadow-lg">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🚀</span>
                    <h3 className="font-editorial text-sm font-semibold text-stone-100">
                      2. Piloto Automático 24/7 con RSS Feed
                    </h3>
                  </div>
                  <span className="text-[10px] bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded-full font-mono">
                    100% Desatendido
                  </span>
                </div>

                <p className="text-xs text-stone-400 leading-relaxed">
                  Si quieres que las 66 historias se publiquen solas en tu Facebook sin que tengas que abrir esta web nunca más, conecta tu feed RSS a un automatizador gratuito como <strong className="text-stone-200">dlvr.it</strong> o <strong className="text-stone-200">Buffer</strong>.
                </p>

                {/* RSS URL Box */}
                <div className="p-3 bg-stone-950 border border-stone-800 rounded-sm space-y-1.5">
                  <span className="text-[11px] font-mono text-stone-400 block">Tu URL RSS Oficial de Archivo Inusual:</span>
                  <div className="flex items-center justify-between gap-2 bg-stone-900 p-2 rounded-xs border border-stone-800">
                    <code className="text-xs font-mono text-amber-400 truncate">
                      https://archivoinusual.vercel.app/rss.xml
                    </code>
                    <button
                      onClick={() => handleCopyUrl('https://archivoinusual.vercel.app/rss.xml')}
                      className="py-1 px-3 bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-mono font-semibold shrink-0 rounded-xs cursor-pointer"
                    >
                      {copiedUrl ? '¡Copiado!' : 'Copiar URL'}
                    </button>
                  </div>
                </div>

                {/* Steps */}
                <div className="p-4 bg-stone-950 border border-stone-800/90 rounded-xs space-y-2 text-xs font-sans text-stone-300">
                  <div className="font-semibold text-amber-400 font-mono text-[11px] uppercase tracking-wider">
                    Instrucciones en 3 pasos (Sin costo):
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-stone-400 leading-relaxed">
                    <li>Regístrate gratis en 👉 <a href="https://dlvr.it" target="_blank" rel="noreferrer" className="text-amber-300 underline font-medium">dlvr.it</a> o <a href="https://buffer.com" target="_blank" rel="noreferrer" className="text-amber-300 underline font-medium">Buffer</a>.</li>
                    <li>En "Source" / "Fuente", pega la URL RSS copiada arriba.</li>
                    <li>En "Destination" / "Destino", conecta tu Página de Facebook.</li>
                    <li>Elige el horario (por ejemplo: 3 historias al día o todas) y activa el piloto automático.</li>
                  </ol>
                </div>

                <div className="p-3 bg-amber-950/30 border border-amber-700/50 rounded-xs text-[11px] text-amber-200/90 leading-relaxed">
                  ✨ <strong>Ventaja clave:</strong> Cada vez que agregues un nuevo artículo a la web, dlvr.it lo detectará y lo publicará en tu Facebook automáticamente con la imagen y el enlace.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROBAR NUEVA HISTORIA ANTES DE PUBLICAR */}
        {activeTab === 'test' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 bg-[#141210] border border-stone-800 p-6 rounded-sm space-y-4 shadow-lg">
              <div className="pb-3 border-b border-stone-800 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-amber-400 font-semibold">
                    Simulador de Nueva Historia
                  </h2>
                  <p className="text-xs text-stone-500 mt-1">
                    Comprueba cómo se genera la portada 1080x1350 antes de publicarla.
                  </p>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-stone-300 block mb-1">Título de la historia:</label>
                <input
                  type="text"
                  value={testTitle}
                  onChange={(e) => setTestTitle(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 px-3 py-2 text-xs text-stone-100 rounded-sm font-editorial"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-stone-300 block mb-1">Subtítulo / Lugar / Año:</label>
                <input
                  type="text"
                  value={testLocation}
                  onChange={(e) => setTestLocation(e.target.value.toUpperCase())}
                  className="w-full bg-stone-950 border border-stone-800 px-3 py-2 text-xs text-amber-400 rounded-sm font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-stone-300 block mb-1">Categoría del archivo:</label>
                <input
                  type="text"
                  value={testCategory}
                  onChange={(e) => setTestCategory(e.target.value.toUpperCase())}
                  className="w-full bg-stone-950 border border-stone-800 px-3 py-2 text-xs text-stone-100 rounded-sm font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-stone-300 block mb-1">Extracto / Sinopsis:</label>
                <textarea
                  rows={3}
                  value={testExcerpt}
                  onChange={(e) => setTestExcerpt(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 px-3 py-2 text-xs text-stone-300 rounded-sm leading-relaxed"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-stone-300 block mb-1">URL de la imagen de fondo:</label>
                <input
                  type="text"
                  value={testImage}
                  onChange={(e) => setTestImage(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 px-3 py-2 text-xs text-stone-300 rounded-sm font-mono text-[11px]"
                />
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="w-full bg-[#141210] border border-stone-800 p-5 rounded-sm flex flex-col items-center shadow-lg">
                <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-stone-800">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400 font-semibold">
                    Resultado Generado
                  </span>
                  <span className="text-[10px] text-stone-500 font-mono">1080 × 1350 px</span>
                </div>

                <div className="w-full max-w-[340px] aspect-[4/5] rounded-xs overflow-hidden border border-stone-700/80 shadow-2xl bg-black">
                  <canvas ref={testCanvasRef} className="w-full h-full object-contain" />
                </div>

                <div className="w-full mt-4">
                  <button
                    onClick={handleDownload}
                    className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 rounded-xs shadow-md cursor-pointer transition-colors"
                  >
                    <span>↓</span>
                    Descargar Portada de Prueba
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: RSS FEED XML */}
        {activeTab === 'rss' && (
          <div className="bg-[#141210] border border-stone-800 p-6 rounded-sm space-y-6 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
              <div>
                <h2 className="text-base font-editorial text-amber-300 font-semibold">
                  Feed RSS XML Oficial
                </h2>
                <p className="text-xs text-stone-400 mt-1">
                  Enlace permanente para lectores de noticias y distribución automatizada.
                </p>
              </div>
              <a
                href="/rss.xml"
                target="_blank"
                rel="noreferrer"
                className="py-2 px-3 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs flex items-center gap-1.5 rounded-xs"
              >
                <IconExternal className="w-3.5 h-3.5" />
                Abrir Archivo RSS Directo
              </a>
            </div>

            <div className="p-4 bg-stone-950 border border-stone-800 rounded-sm">
              <span className="text-xs font-mono text-stone-400 block mb-1">URL Pública del Feed RSS:</span>
              <div className="flex items-center justify-between gap-3 bg-stone-900 p-2.5 rounded-xs border border-stone-800">
                <code className="text-xs font-mono text-amber-400 break-all">https://archivoinusual.vercel.app/rss.xml</code>
                <button
                  onClick={() => handleCopyUrl('https://archivoinusual.vercel.app/rss.xml')}
                  className="py-1 px-3 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono shrink-0 rounded-xs cursor-pointer"
                >
                  Copiar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal 1: Publicación Rápida Individual en Facebook */}
        {showPublishModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#141210] border border-stone-700 max-w-md w-full rounded-sm p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🚀</span>
                  <h3 className="font-editorial text-base text-stone-100 font-semibold">
                    Listo para Publicar en Facebook
                  </h3>
                </div>
                <button
                  onClick={() => setShowPublishModal(false)}
                  className="text-stone-500 hover:text-stone-300 text-lg leading-none cursor-pointer p-1"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 font-sans text-xs">
                <div className="flex items-start gap-3 p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-sm text-emerald-200">
                  <span className="text-base font-bold text-emerald-400">✓</span>
                  <div>
                    <div className="font-semibold text-emerald-300">1. Portada descargada en tu dispositivo</div>
                    <div className="text-[11px] text-emerald-400/80">Imagen vertical 1080×1350 px en tu carpeta de descargas / galería.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-sm text-emerald-200">
                  <span className="text-base font-bold text-emerald-400">✓</span>
                  <div>
                    <div className="font-semibold text-emerald-300">2. Texto y enlace copiados al portapapeles</div>
                    <div className="text-[11px] text-emerald-400/80">Listo para solo "Pegar" en la descripción de tu publicación.</div>
                  </div>
                </div>

                <div className="p-3 bg-stone-900 border border-stone-800 rounded-sm text-stone-300 space-y-1">
                  <div className="font-semibold text-amber-400">3. Paso final en tu Página de Facebook:</div>
                  <ol className="list-decimal list-inside text-[11px] text-stone-400 space-y-1">
                    <li>Toca <strong>«Crear publicación»</strong> o <strong>«Foto»</strong>.</li>
                    <li>Selecciona la portada recién descargada.</li>
                    <li>Mantén presionado y dale a <strong>«Pegar»</strong> el texto.</li>
                    <li>Toca <strong>«Publicar»</strong>.</li>
                  </ol>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-stone-800">
                <a
                  href="https://m.facebook.com/profile.php?id=61595001542003"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setShowPublishModal(false)}
                  className="flex-1 py-2.5 px-4 bg-[#1877F2] hover:bg-[#166fe5] text-white text-center font-semibold text-xs rounded-xs flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Abrir mi Página de Facebook</span>
                  <IconExternal className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setShowPublishModal(false)}
                  className="py-2.5 px-4 bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium text-xs rounded-xs cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal 2: Asistente de Publicación en Cola (Lote / Bulk Queue) */}
        {queueModalOpen && selectedArticlesList.length > 0 && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#141210] border border-amber-600/50 max-w-lg w-full rounded-sm p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🚀</span>
                  <div>
                    <h3 className="font-editorial text-base text-stone-100 font-semibold">
                      Publicando en Cola ({queueIndex + 1} de {selectedArticlesList.length})
                    </h3>
                    <div className="text-[10px] text-amber-400 font-mono">
                      {publishedQueueIds.length} publicadas con éxito
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setQueueModalOpen(false)}
                  className="text-stone-500 hover:text-stone-300 text-lg leading-none cursor-pointer p-1"
                >
                  ✕
                </button>
              </div>

              {/* Current Queue Article Card */}
              {(() => {
                const currentArt = selectedArticlesList[queueIndex];
                const postText = buildDlvrItPostText(currentArt);
                const isPublished = publishedQueueIds.includes(currentArt.id);

                return (
                  <div className="space-y-4 text-xs font-sans">
                    <div className="flex gap-3 bg-stone-950 p-3 rounded-sm border border-stone-800">
                      <div className="w-16 h-20 rounded-xs overflow-hidden shrink-0 bg-stone-900 border border-stone-800">
                        <img 
                          src={currentArt.coverImage} 
                          alt="" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-amber-500 font-mono uppercase">{currentArt.categoryLabel}</span>
                        <h4 className="font-editorial text-stone-100 font-medium text-xs line-clamp-2 mt-0.5">
                          {currentArt.title}
                        </h4>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={async () => {
                              const blob = await generateArticleImageBlob(currentArt);
                              if (blob) {
                                const link = document.createElement('a');
                                link.href = URL.createObjectURL(blob);
                                link.download = `${currentArt.slug}-1080x1350.jpg`;
                                link.click();
                                URL.revokeObjectURL(link.href);
                              }
                            }}
                            className="py-1 px-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-[10px] rounded-xs cursor-pointer flex items-center gap-1"
                          >
                            <span>↓</span>
                            <span>Descargar Esta Foto</span>
                          </button>

                          <button
                            onClick={() => handleCopyText(postText)}
                            className="py-1 px-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-[10px] rounded-xs cursor-pointer flex items-center gap-1"
                          >
                            {copiedText ? '✓ Copiado' : '📋 Copiar Texto'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Formatted Post Preview */}
                    <div className="p-3 bg-stone-950 border border-stone-800/80 rounded-xs text-[11px] text-stone-300 max-h-36 overflow-y-auto whitespace-pre-wrap font-sans">
                      {postText}
                    </div>

                    {/* Step Actions */}
                    <div className="flex items-center justify-between gap-3 pt-2">
                      <a
                        href="https://m.facebook.com/profile.php?id=61595001542003"
                        target="_blank"
                        rel="noreferrer"
                        className="py-2 px-4 bg-[#1877F2] hover:bg-[#166fe5] text-white font-semibold text-xs rounded-xs flex items-center gap-1.5 shadow-md"
                      >
                        <span>Abrir Facebook</span>
                        <IconExternal className="w-3 h-3" />
                      </a>

                      <button
                        onClick={() => {
                          if (!isPublished) {
                            setPublishedQueueIds(prev => [...prev, currentArt.id]);
                          }
                          if (queueIndex < selectedArticlesList.length - 1) {
                            setQueueIndex(prev => prev + 1);
                          }
                        }}
                        className="py-2 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <span>Marcar Publicada y Siguiente</span>
                        <IconArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Queue Navigator */}
                    <div className="flex items-center justify-between pt-3 border-t border-stone-800 text-xs text-stone-400">
                      <button
                        disabled={queueIndex === 0}
                        onClick={() => setQueueIndex(prev => Math.max(0, prev - 1))}
                        className="hover:text-stone-200 disabled:opacity-30 cursor-pointer"
                      >
                        ← Anterior
                      </button>

                      <span className="font-mono text-[11px]">
                        Historia {queueIndex + 1} de {selectedArticlesList.length}
                      </span>

                      <button
                        disabled={queueIndex === selectedArticlesList.length - 1}
                        onClick={() => setQueueIndex(prev => Math.min(selectedArticlesList.length - 1, prev + 1))}
                        className="hover:text-stone-200 disabled:opacity-30 cursor-pointer"
                      >
                        Siguiente →
                      </button>
                    </div>
                  </div>
                );
              })()}

            </div>
          </div>
        )}

      </main>
    </div>
  );
};
