// Smooth internal scrolling
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href=a.getAttribute('href');
    if(!href || href==='#') return;
    e.preventDefault();
    const el=document.querySelector(href);
    if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
    const nav=document.getElementById('nav');
    if(nav.classList.contains('show')){
      nav.classList.remove('show');
      document.getElementById('nav-toggle').setAttribute('aria-expanded','false');
    }
  });
});

// Mobile nav toggle
const navToggle=document.getElementById('nav-toggle');
const nav=document.getElementById('nav');
navToggle.addEventListener('click',()=>{
  const expanded=navToggle.getAttribute('aria-expanded')==='true';
  navToggle.setAttribute('aria-expanded',String(!expanded));
  nav.classList.toggle('show');
});

// Dark mode toggle with persistence
const darkToggle=document.getElementById('dark-toggle');
const root=document.documentElement;
function applyTheme(dark){
  if(dark) root.classList.add('dark'); else root.classList.remove('dark');
  darkToggle.setAttribute('aria-pressed',String(dark));
}
const savedTheme=localStorage.getItem('theme-dark');
applyTheme(savedTheme==='true');

darkToggle.addEventListener('click',()=>{
  const now=root.classList.toggle('dark');
  localStorage.setItem('theme-dark',now);
  darkToggle.setAttribute('aria-pressed',String(now));
});

// Language switcher
const langToggle=document.getElementById('lang-toggle');
const savedLanguage=localStorage.getItem('site-language') || 'ar';

const translations={
  ar:{
    htmlLang:'ar', dir:'rtl', button:'EN', switchLabel:'Switch to English',
    title:'محمد سعيد صفدي — مهندس برمجيات | Portfolio',
    description:'الموقع الشخصي لمحمد سعيد صفدي — مهندس برمجيات متخصص في تطوير الأنظمة الخلفية وLaravel. مشاريع عملية، مهارات تقنية، ووسائل تواصل.',
    nav:['عنّي','المهارات','المشاريع','تواصل'],
    heroTitle:'مرحبًا — أنا <span class="accent">محمد</span>',
    heroLead:'أنا مطور أنظمة خلفية متخصّص في Laravel. أقدّم حلولًا قابلة للتوسع، آمنة، وسهلة الصيانة.',
    heroButtons:['عرض المشاريع','مشروعي على GitHub','تحميل السيرة الذاتية'],
    location:'الموقع:', locationValue:'دمشق، سوريا', email:'البريد:',
    aboutTitle:'عنّي',
    about:'مهندس برمجيات متخصص في تطوير الأنظمة الخلفية، مع أساس قوي في هندسة البرمجيات ونظم المعلومات. أمتلك خبرة في تطوير تطبيقات خلفية موثوقة وقابلة للتوسع والصيانة، بالإضافة إلى RESTful APIs باستخدام ممارسات تطوير برمجية حديثة. أمتلك مهارات قوية في حل المشكلات مع التركيز على كتابة كود نظيف وفعال وعالي الجودة، وخبرة في العمل ضمن فرق التطوير وفهم متطلبات الأعمال وتحويلها إلى حلول تقنية فعالة. أحرص على التعلم والتحسين المستمرين، وأمتلك القدرة على التكيف مع المتطلبات المتغيرة والعمل بفعالية تحت الضغط وتحمل مسؤولية المهام طوال دورة حياة تطوير البرمجيات.',
    skillsKicker:'MY SKILLS', skillsTitle:'المهارات والخبرات',
    skillsLead:'مجموعة من المهارات التقنية ومفاهيم هندسة البرمجيات التي أستخدمها لبناء أنظمة منظمة، قابلة للتوسع، آمنة وقابلة للصيانة.',
    skillTitles:['المعمارية المتقدمة ومفاهيم هندسة البرمجيات','تقنيات Backend وقواعد البيانات وORM','لغات البرمجة وأطر العمل','الاختبار والأدوات والأنظمة المؤسسية','مفاهيم ومنهجيات هندسة البرمجيات','المهارات الشخصية ومهارات إضافية'],
    skillDesc:['تصميم الأنظمة وتحليل المتطلبات وبناء معماريات برمجية مرنة.','تطوير خدمات Backend وربط التطبيقات بقواعد البيانات والخدمات.','لغات وأطر متعددة لتطوير تطبيقات الويب والأنظمة والواجهات التفاعلية.','أدوات التطوير وجودة الكود وإدارة النسخ والأنظمة المؤسسية.','مفاهيم متقدمة لبناء أنظمة عالية الأداء، متزامنة، موزعة وقابلة للتوسع.','مهارات شخصية ومهنية تدعم التواصل الفعال والعمل المستمر على التطور.'],
    projectsTitle:'المشاريع', source:'شيفرة المصدر', download:'تحميل الشرح',
    projectDesc:[
      'نظام لإدارة الشكاوى يتيح للمستخدمين تسجيل الشكوى، متابعة حالتها، وللمشرفين إدارة الردود وتحديث الحالات. شامل لعمليات CRUD، توثيق API، وصفحات إدارة مبسطة.',
      'منصة خدمات متكاملة تربط العملاء بمقدمي الخدمات، من إنشاء الطلب واستقبال العروض والتفاوض والمحادثة، وصولًا إلى الدفع الإلكتروني وإتمام الخدمة والتقييم.',
      'نظام لاسترجاع المعلومات وبناء محرك بحث مخصص باستخدام TF-IDF وBM25 وEmbeddings وHybrid Retrieval، مع معالجة الاستعلامات وترتيب النتائج وتقييم أداء النظام.',
      'تطبيق خيري لإدارة الجمعية والتبرعات، مع تسجيل دخول للمستخدمين والمديرين، الدفع الإلكتروني، إدارة طلبات الاستفادة، التبرعات العينية، ولوحة تحكم متكاملة وإحصائيات.',
      'مشروع مترجم يركز على بناء محلل لغوي باستخدام ANTLR وJava، بدءًا من القواعد المعجمية والنحوية، وبناء AST وعرضها، بالإضافة إلى بناء جدول الرموز.',
      'منصة رقمية للاستشارات والخبراء تتيح البحث عن الخبراء وحجز المواعيد والدفع والمحافظ الإلكترونية، مع المراسلة والتقييمات والمفضلة ودعم العربية والإنجليزية والمكالمات الصوتية باستخدام Agora.',
      'نظام إدارة مصرفية مبني باستخدام Java ومبادئ البرمجة كائنية التوجه، مع تطبيق مجموعة من Design Patterns لبناء نظام مرن وقابل للتوسع وسهل الصيانة، بالإضافة إلى JWT والأمان، التخزين المؤقت، الإشعارات، المعاملات المالية، التقارير، واختبارات الوحدات.',
      'نظام محاكاة لإطلاق صاروخ والتحكم به مع تطبيق محاكاة فيزيائية واقعية لحركة الصاروخ.',
      'تطبيق Desktop للتعامل مع صور الأشعة السينية الطبية، يتيح عرض الصور وتحديد وتلوين المناطق المصابة، تطبيق Color Maps وتحسين الصور باستخدام تحويلات فورييه، المقارنة والتصنيف، إضافة التعليقات النصية والصوتية، إنشاء التقارير وتصديرها بصيغة PDF وحفظ ومشاركة الملفات.'
    ],
    contactTitle:'تواصل', contactLead:'هل تريد التعاون أو تحتاج مساعدة في مشروع؟ تواصل معي عبر:',
    emailTitle:'البريد الإلكتروني', githubTitle:'GitHub', cvTitle:'سيرة ذاتية', cvDownload:'تحميل السيرة الذاتية (PDF)',
    footer:'جميع الحقوق محفوظة.'
  },
  en:{
    htmlLang:'en', dir:'ltr', button:'AR', switchLabel:'التبديل إلى العربية',
    title:'Mohamad Saeed Safadi — Software Engineer | Portfolio',
    description:'Mohamad Saeed Safadi’s portfolio — Software Engineer specializing in backend development and Laravel. Practical projects, technical skills, and contact information.',
    nav:['About','Skills','Projects','Contact'],
    heroTitle:'Hello — I’m <span class="accent">Mohamad</span>',
    heroLead:'I am a backend developer specializing in Laravel, delivering scalable, secure, and maintainable solutions.',
    heroButtons:['View Projects','My GitHub','Download CV'],
    location:'Location:', locationValue:'Damascus, Syria', email:'Email:',
    aboutTitle:'About Me',
    about:'Software Engineer specializing in backend development, with a strong foundation in software engineering and information systems. Experienced in developing reliable, scalable, and maintainable backend applications and RESTful APIs using modern software development practices. Strong problem-solving skills with a focus on writing clean, efficient, and high-quality code. Experienced in collaborating with software development teams, understanding business requirements, and delivering effective technical solutions. Committed to continuous learning and improvement, with the ability to adapt to changing requirements, work effectively under pressure, and take ownership of tasks throughout the software development lifecycle.',
    skillsKicker:'MY SKILLS', skillsTitle:'Skills & Expertise',
    skillsLead:'A practical set of technical skills and software engineering concepts I use to build organized, scalable, secure, and maintainable systems.',
    skillTitles:['Advanced Architecture & Software Engineering Concepts','Core Backend Technologies, Databases & ORM','Programming Languages & Frameworks','Testing, Tools & Enterprise Systems','Engineering Concepts & Methodologies','Soft Skills & Additional Skills'],
    skillDesc:['System design, requirements analysis, and building flexible software architectures.','Building backend services and connecting applications with databases and external services.','Multiple languages and frameworks for web applications, systems, and interactive interfaces.','Development tools, code quality, version control, and enterprise systems.','Advanced concepts for building high-performance, concurrent, distributed, and scalable systems.','Professional and interpersonal skills that support effective communication and continuous growth.'],
    projectsTitle:'Projects', source:'Source Code', download:'Download Details',
    projectDesc:[
      'A complaint management system that allows users to submit complaints and track their status while administrators manage responses and updates. Includes CRUD operations, API documentation, and streamlined management pages.',
      'A complete service marketplace connecting customers with service providers through requests, offers, negotiation, chat, electronic payment, service completion, and ratings.',
      'An information retrieval system and custom search engine using TF-IDF, BM25, Embeddings, and Hybrid Retrieval, with query processing, result ranking, and performance evaluation.',
      'A charity application for managing the organization and donations, including user and admin authentication, electronic payments, beneficiary requests, in-kind donations, an integrated dashboard, and statistics.',
      'A compiler project focused on building a language analyzer using ANTLR and Java, covering lexical and syntax rules, AST construction and visualization, and symbol table generation.',
      'A digital consultation and expert platform that supports expert discovery, appointment booking, payments and e-wallets, messaging, ratings, favorites, Arabic/English support, and voice calls using Agora.',
      'A Java banking management system built with object-oriented programming and design patterns for a flexible, scalable, and maintainable architecture, with JWT security, caching, notifications, financial transactions, reports, and unit testing.',
      'A rocket launch and control simulation with realistic physics-based rocket motion.',
      'A desktop application for working with medical X-ray images, including image viewing, affected-area highlighting, color maps, Fourier-transform enhancement, comparison and classification, text and audio annotations, PDF reports, and file storage/sharing.'
    ],
    contactTitle:'Contact', contactLead:'Want to collaborate or need help with a project? Get in touch through:',
    emailTitle:'Email', githubTitle:'GitHub', cvTitle:'Resume', cvDownload:'Download CV (PDF)',
    footer:'All rights reserved.'
  }
};

function setText(selector,value){
  const el=document.querySelector(selector);
  if(el) el.textContent=value;
}
function applyLanguage(lang){
  const t=translations[lang];
  document.documentElement.lang=t.htmlLang;
  document.documentElement.dir=t.dir;
  document.title=t.title;
  const meta=document.querySelector('meta[name="description"]');
  if(meta) meta.setAttribute('content',t.description);

  document.querySelectorAll('#nav > a').forEach((el,i)=>el.textContent=t.nav[i]);
  langToggle.textContent=t.button;
  langToggle.setAttribute('aria-label',t.switchLabel);

  const brandMark=document.querySelector('.brand-mark');
  if(brandMark) brandMark.textContent=lang==='ar'?'م':'M';
  setText('.brand-text .name','محمد سعيد صفدي');
  setText('.brand-text .role','Software Engineer');
  setText('.hero-text h1',null);
  const heroTitle=document.querySelector('.hero-text h1'); if(heroTitle) heroTitle.innerHTML=t.heroTitle;
  setText('.hero-text .lead',t.heroLead);
  document.querySelectorAll('.cta-row a').forEach((el,i)=>el.textContent=t.heroButtons[i]);
  setText('.hero-meta div:first-child',t.location+' '+t.locationValue);
  const emailMeta=document.querySelector('.hero-meta div:nth-child(2)');
  if(emailMeta) emailMeta.innerHTML='<strong>'+t.email+'</strong> <a href="mailto:mohamadsaeedsafadi@gmail.com">mohamadsaeedsafadi@gmail.com</a>';

  setText('#about .section-title',t.aboutTitle);
  setText('#about .section-lead',t.about);
  setText('#skills .section-kicker',t.skillsKicker);
  setText('#skills .section-title',t.skillsTitle);
  setText('#skills .skills-lead',t.skillsLead);
  document.querySelectorAll('.skill-category').forEach((card,i)=>{
    const h=card.querySelector('h3'), p=card.querySelector('p');
    if(h) h.textContent=t.skillTitles[i];
    if(p) p.textContent=t.skillDesc[i];
  });

  setText('#projects .section-title',t.projectsTitle);
  document.querySelectorAll('.project-card').forEach((card,i)=>{
    const desc=card.querySelector('.project-desc'); if(desc) desc.textContent=t.projectDesc[i];
    card.querySelectorAll('.project-links a').forEach((el,j)=>el.textContent=j===0?t.source:t.download);
  });

  setText('#contact .section-title',t.contactTitle);
  setText('#contact .section-lead',t.contactLead);
  const contactCards=document.querySelectorAll('.contact-card');
  if(contactCards[0]) contactCards[0].querySelector('h4').textContent=t.emailTitle;
  if(contactCards[1]) contactCards[1].querySelector('h4').textContent=t.githubTitle;
  if(contactCards[2]){
    contactCards[2].querySelector('h4').textContent=t.cvTitle;
    contactCards[2].querySelector('a').textContent=t.cvDownload;
  }

  const footer=document.querySelector('.site-footer p');
  if(footer) footer.innerHTML='© <span id="year">'+new Date().getFullYear()+'</span> محمد سعيد صفدي — '+t.footer;
  localStorage.setItem('site-language',lang);
}
applyLanguage(savedLanguage);
langToggle.addEventListener('click',()=>applyLanguage((localStorage.getItem('site-language')||'ar')==='ar'?'en':'ar'));


// Project image galleries
const projectGalleries = [
  [
    'files/complaint/1.png'
  ],
  [
    'files/Hands/إدارة التذاكر.png',
    'files/Hands/الإحصائيات والتقارير1.png',
    'files/Hands/الإحصائيات والتقارير2.png',
    'files/Hands/الاشعارات.png',
    'files/Hands/الخريطة.png',
    'files/Hands/الدفع.png',
    'files/Hands/الطلبات الواردة عند البروفايدر.png',
    'files/Hands/العروض الحالية عند المستخدم.png',
    'files/Hands/المحفظة بعد السحب.png',
    'files/Hands/النسخ الاحتياطي.png',
    'files/Hands/انشاء حساب.png',
    'files/Hands/تصدير التقارير.png',
    'files/Hands/تفاصيل للعملية السحب.png',
    'files/Hands/توضيح حالة ارسال فاتورة مخفضة.png',
    'files/Hands/توضيح لحالات الطلب اذا كان بدو دفع او تقييم.png',
    'files/Hands/داشبورد( سوبر ادمن).png',
    'files/Hands/سجل الطلبات كامل.png',
    'files/Hands/طلب سحب رصيد.png',
    'files/Hands/قائمة المحادثات.png',
    'files/Hands/كمان ابروفايل للبروفايدر بس بصورة اوضح.jpg',
    'files/Hands/واجهة مركز الدعم لتقديم الشكاوي والاقتراحات.jpg'
  ],
  [
    'files/information/1.png',
    'files/information/2.jpg',
    'files/information/3.jpg'
  ],
  [
    'files/OneHand/صورة1.png'
  ],
  [
    'files/compailer/1.png'
  ],
  [
    'files/Takaful/1.jpg',
    'files/Takaful/photo_2026-10-05_04-22-04.jpg',
    'files/Takaful/photo_2026-10-05_04-22-08.jpg',
    'files/Takaful/photo_2026-10-05_04-22-12.jpg'
  ],
  [
    'files/bank/1.png'
  ],
  [
    'files/Rocket/screenshot_1.png',
    'files/Rocket/screenshot_2.png',
    'files/Rocket/screenshot_3.png'
  ],
  [
    'files/xray/1.png'
  ]
];

function initProjectGalleries(){
  document.querySelectorAll('.project-card').forEach((card,index)=>{
    const images=projectGalleries[index];
    const frame=card.querySelector('.project-image');
    const image=frame?.querySelector('img');
    if(!images || !frame || !image) return;

    let current=0;
    image.src=images[0];
    image.alt=card.querySelector('.project-head h3')?.textContent?.trim() || 'Project image';
    image.loading='lazy';
    image.decoding='async';
    image.style.cursor=images.length>1?'zoom-in':'pointer';

    if(images.length>1){
      frame.classList.add('has-gallery');

      const prev=document.createElement('button');
      prev.type='button';
      prev.className='gallery-arrow gallery-prev';
      prev.setAttribute('aria-label','Previous image');
      prev.innerHTML='&#10094;';

      const next=document.createElement('button');
      next.type='button';
      next.className='gallery-arrow gallery-next';
      next.setAttribute('aria-label','Next image');
      next.innerHTML='&#10095;';

      const dots=document.createElement('div');
      dots.className='gallery-dots';
      dots.setAttribute('aria-label','Image navigation');

      images.forEach((_,dotIndex)=>{
        const dot=document.createElement('button');
        dot.type='button';
        dot.className='gallery-dot';
        dot.setAttribute('aria-label',`Image ${dotIndex+1}`);
        dot.addEventListener('click',event=>{
          event.stopPropagation();
          showImage(dotIndex);
        });
        dots.appendChild(dot);
      });

      function showImage(indexToShow){
        current=(indexToShow+images.length)%images.length;
        image.src=images[current];
        dots.querySelectorAll('.gallery-dot').forEach((dot,i)=>{
          dot.classList.toggle('active',i===current);
        });
      }

      prev.addEventListener('click',event=>{
        event.stopPropagation();
        showImage(current-1);
      });
      next.addEventListener('click',event=>{
        event.stopPropagation();
        showImage(current+1);
      });

      frame.append(prev,image,next,dots);
      showImage(0);
    } else {
      frame.classList.add('single-image');
    }

    image.addEventListener('click',()=>{
      openGalleryLightbox(images,current,card.querySelector('.project-head h3')?.textContent?.trim() || 'Project image');
    });
  });
}

function openGalleryLightbox(images,startIndex,title){
  let overlay=document.getElementById('gallery-lightbox');
  if(!overlay){
    overlay=document.createElement('div');
    overlay.id='gallery-lightbox';
    overlay.className='gallery-lightbox';
    overlay.innerHTML=`
      <button type="button" class="lightbox-close" aria-label="Close image">&times;</button>
      <button type="button" class="lightbox-arrow lightbox-prev" aria-label="Previous image">&#10094;</button>
      <div class="lightbox-content">
        <img class="lightbox-image" alt="">
        <div class="lightbox-caption"></div>
      </div>
      <button type="button" class="lightbox-arrow lightbox-next" aria-label="Next image">&#10095;</button>
    `;
    document.body.appendChild(overlay);

    overlay.addEventListener('click',event=>{
      if(event.target===overlay || event.target.classList.contains('lightbox-close')) closeGalleryLightbox();
    });
  }

  let current=startIndex;
  const lightboxImage=overlay.querySelector('.lightbox-image');
  const caption=overlay.querySelector('.lightbox-caption');

  function render(){
    lightboxImage.src=images[current];
    lightboxImage.alt=title;
    caption.textContent=images.length>1 ? `${title} — ${current+1} / ${images.length}` : title;
  }

  const previous=overlay.querySelector('.lightbox-prev');
  const next=overlay.querySelector('.lightbox-next');
  previous.style.display=images.length>1?'flex':'none';
  next.style.display=images.length>1?'flex':'none';

  previous.onclick=event=>{
    event.stopPropagation();
    current=(current-1+images.length)%images.length;
    render();
  };
  next.onclick=event=>{
    event.stopPropagation();
    current=(current+1)%images.length;
    render();
  };

  overlay.classList.add('open');
  document.body.classList.add('lightbox-open');
  render();

  document.onkeydown=function(event){
    if(!document.getElementById('gallery-lightbox')?.classList.contains('open')) return;
    if(event.key==='Escape') closeGalleryLightbox();
    if(event.key==='ArrowLeft') next.click();
    if(event.key==='ArrowRight') previous.click();
  };
}

function closeGalleryLightbox(){
  const overlay=document.getElementById('gallery-lightbox');
  if(overlay) overlay.classList.remove('open');
  document.body.classList.remove('lightbox-open');
  document.onkeydown=null;
}

initProjectGalleries();

// set current year
document.getElementById('year').textContent=new Date().getFullYear();

// Legacy skill animation support
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.querySelectorAll('.bar-fill').forEach(el=>{
        el.style.width=el.style.width||'0%';
      });
      observer.unobserve(entry.target);
    }
  });
},{threshold:0.25});
document.querySelectorAll('.skills-grid .skill').forEach(s=>observer.observe(s));
