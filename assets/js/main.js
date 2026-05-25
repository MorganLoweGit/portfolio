const nav_el = document.getElementById('nav');

function update_nav() {
  nav_el.classList.toggle('scrolled', window.scrollY > 40);
}

window.addEventListener('scroll', update_nav, { passive: true });
update_nav();

const all_sections = document.querySelectorAll('section[id]');
const all_nav_links = document.querySelectorAll('.nav-links a');

const link_map = {};
all_nav_links.forEach(a => {
  const id = a.getAttribute('href')?.replace('#', '');
  if (id) link_map[id] = a;
});

const section_observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        all_nav_links.forEach(a => a.classList.remove('active'));
        const link = link_map[entry.target.id];
        if (link) link.classList.add('active');
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
);

all_sections.forEach(s => section_observer.observe(s));

const nav_toggle = document.querySelector('.nav-toggle');
const nav_menu = document.querySelector('.nav-links');

nav_toggle?.addEventListener('click', () => {
  const open = nav_menu.classList.toggle('open');
  nav_toggle.classList.toggle('open', open);
  nav_toggle.setAttribute('aria-expanded', open);
});

nav_menu?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    nav_menu.classList.remove('open');
    nav_toggle.classList.remove('open');
    nav_toggle.setAttribute('aria-expanded', false);
  });
});

const SKILL_LOGOS = {
  'C#': {
    logo:    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
    website: 'https://learn.microsoft.com/en-us/dotnet/csharp/',
  },
  'C++': {
    logo:    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    website: 'https://isocpp.org',
  },
  'Python': {
    logo:    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    website: 'https://www.python.org',
  },
  'HTML': {
    logo:    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    website: 'https://developer.mozilla.org/en-US/docs/Web',
  },
  'CSS': {
    logo:    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
    website: 'https://developer.mozilla.org/en-US/docs/Web',
  },
  'JavaScript': {
    logo:    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    website: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  'Unity': {
    logo:    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg',
    website: 'https://unity.com',
  },
  'Autodesk Maya': {
    logo:    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maya/maya-original.svg',
    website: 'https://www.autodesk.com/products/maya',
  },
  'Adobe Photoshop': {
    logo:    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg',
    website: 'https://www.adobe.com/products/photoshop.html',
  },
  'Adobe Illustrator': {
    logo:    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg',
    website: 'https://www.adobe.com/products/illustrator.html',
  },
  'Visual Studio Code': {
    logo:    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
    website: 'https://code.visualstudio.com',
  },
  'Visual Studio 2022': {
    logo:    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg',
    website: 'https://visualstudio.microsoft.com',
  },
  'JetBrains PyCharm': {
    logo:    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pycharm/pycharm-original.svg',
    website: 'https://www.jetbrains.com/pycharm/',
  },
  'Blender': {
    logo:    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg',
    website: 'https://www.blender.org/',
  },
  'Anaconda Prompt': {
    logo:    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/anaconda/anaconda-original.svg',
    website: 'https://www.anaconda.com/download',
  },
  'TensorBoard': {
    logo:    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg',
    website: 'https://www.tensorflow.org/tensorboard',
  },
  'SDL2': {
    logo:    'assets/images/logos/sdl2-icon.png',
    website: 'https://wiki.libsdl.org/SDL2/FrontPage',
  },
  'Pygame': {
    logo:    'assets/images/logos/pygame-icon.png',
    website: 'https://www.pygame.org/news',
  },
  'Unreal Engine': {
    logo:    'assets/images/logos/unreal-engine-icon.png',
    website: 'https://www.unrealengine.com',
  },
  'GitHub': {
    logo:    'assets/images/logos/github-icon.png',
    website: 'https://github.com',
  },
  'BlueStacks': {
    logo:    'assets/images/logos/bluestacks-icon.png',
    website: 'https://www.bluestacks.com/',
  },
  'GitHub Desktop': {
    logo:    'assets/images/logos/github-icon.png',
    website: 'https://github.com/apps/desktop',
  },
  'FMOD': {
    logo:    'assets/images/logos/fmod-icon.png',
    website: 'https://www.fmod.com/',
  },
  'Adobe Substance Painter 3D': {
    logo:    'assets/images/logos/adobe-substance-3d-painter-icon.png',
    website: 'https://www.adobe.com/products/substance3d-painter.html',
  },
  'Adobe Audition': {
    logo:    'assets/images/logos/adobe-audition-icon.png',
    website: 'https://www.adobe.com/products/audition.html',
  },
  'UE Blueprints': {
    logo:    'assets/images/logos/uebp-icon.png',
    website: 'https://www.unrealengine.com/blog/introduction-to-blueprints',
  },
  'MS Paint': {
    logo:    'assets/images/logos/paint-3d-icon.png',
    website: 'https://www.microsoft.com/en-us/windows/paint',
  },
};

function inject_skill_logos() {
  const targets = [
    { els: document.querySelectorAll('.skill-tags li'),     text_fn: el => el.textContent.trim() },
    { els: document.querySelectorAll('.project-tags span'), text_fn: el => el.textContent.trim() },
  ];

  targets.forEach(({ els, text_fn }) => {
    els.forEach(el => {
      const name  = text_fn(el);
      const entry = SKILL_LOGOS[name];
      if (!entry) return;

      const img = document.createElement('img');
      img.src   = entry.logo;
      img.alt   = '';
      img.setAttribute('aria-hidden', 'true');
      img.className = 'skill-logo';

      if (entry.website) {
        const link = document.createElement('a');
        link.href      = entry.website;
        link.target    = '_blank';
        link.rel       = 'noopener noreferrer';
        link.className = 'skill-logo-link';
        link.setAttribute('aria-label', `${name} website`);
        link.appendChild(img);
        el.prepend(link);
      } else {
        el.prepend(img);
      }
    });
  });
}

inject_skill_logos();

function build_projects_dropdown() {
  const inner = document.getElementById('nav-projects-inner');
  if (!inner) return;

  const cards = document.querySelectorAll('.project-card[data-project-title]');
  if (cards.length === 0) {
    inner.closest('.nav-dropdown').style.display = 'none';
    return;
  }

  cards.forEach(card => {
    const title = card.getAttribute('data-project-title');
    const a = document.createElement('a');
    a.href = '#projects';
    a.textContent = title;
    a.addEventListener('click', e => {
      e.preventDefault();
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    inner.appendChild(a);
  });
}

function build_skills_dropdown() {
  const inner = document.getElementById('nav-skills-inner');
  if (!inner) return;

  const groups = document.querySelectorAll('#skills .skills-group');
  groups.forEach(group => {
    const heading = group.querySelector('h3');
    if (!heading) return;

    const a = document.createElement('a');
    a.href = '#skills';
    a.textContent = heading.textContent;
    a.addEventListener('click', e => {
      e.preventDefault();
      group.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    inner.appendChild(a);
  });
}

build_projects_dropdown();
build_skills_dropdown();

const svg_pause = `<svg viewBox="0 0 10 12" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="3" height="12"/><rect x="6" y="0" width="3" height="12"/></svg>`;
const svg_play  = `<svg viewBox="0 0 10 12" xmlns="http://www.w3.org/2000/svg"><polygon points="0,0 10,6 0,12"/></svg>`;
const svg_muted = `<svg viewBox="0 0 14 12" xmlns="http://www.w3.org/2000/svg"><polygon points="0,3 4,3 8,0 8,12 4,9 0,9"/><line x1="10" y1="3" x2="14" y2="9" stroke="currentColor" stroke-width="1.5"/><line x1="14" y1="3" x2="10" y2="9" stroke="currentColor" stroke-width="1.5"/></svg>`;
const svg_sound = `<svg viewBox="0 0 14 12" xmlns="http://www.w3.org/2000/svg"><polygon points="0,3 4,3 8,0 8,12 4,9 0,9"/><path d="M10 2 Q13 6 10 10" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M11.5 0.5 Q15.5 6 11.5 11.5" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`;

function make_play_btn() {
  const btn = document.createElement('button');
  btn.className = 'video-btn';
  btn.setAttribute('aria-label', 'Pause video');
  btn.innerHTML = svg_pause;
  return btn;
}

function make_mute_btn(allow_unmute) {
  const btn = document.createElement('button');
  btn.className = 'video-btn';

  if (allow_unmute) {
    btn.setAttribute('aria-label', 'Unmute video');
    btn.innerHTML = svg_muted;
  } else {
    btn.setAttribute('aria-label', 'Audio unavailable');
    btn.innerHTML = svg_muted;
    btn.disabled = true;
    btn.style.opacity = '0.35';
    btn.style.cursor = 'not-allowed';
  }

  return btn;
}

function init_video_controls() {
  document.querySelectorAll('.project-media').forEach(media => {
    const video = media.querySelector('video');
    if (!video) return;

    const allow_unmute = video.hasAttribute('data-allow-unmute');

    const controls = document.createElement('div');
    controls.className = 'video-controls';

    const play_btn = make_play_btn();
    play_btn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        play_btn.setAttribute('aria-label', 'Pause video');
        play_btn.innerHTML = svg_pause;
      } else {
        video.pause();
        play_btn.setAttribute('aria-label', 'Play video');
        play_btn.innerHTML = svg_play;
      }
    });

    const mute_btn = make_mute_btn(allow_unmute);
    if (allow_unmute) {
      mute_btn.addEventListener('click', () => {
        video.muted = !video.muted;
        if (video.muted) {
          mute_btn.setAttribute('aria-label', 'Unmute video');
          mute_btn.innerHTML = svg_muted;
        } else {
          mute_btn.setAttribute('aria-label', 'Mute video');
          mute_btn.innerHTML = svg_sound;
        }
      });
    }

    controls.appendChild(play_btn);
    controls.appendChild(mute_btn);
    media.appendChild(controls);
  });
}

init_video_controls();

/* ─── Expandable past-work cards (click anywhere on card) ────────────────── */
(function init_expandable_cards() {
  document.querySelectorAll('.project-card--expandable').forEach(card => {
    card.addEventListener('click', e => {
      // Don't toggle if the user clicked a link, button, or video control
      if (e.target.closest('a, button, .video-controls')) return;

      const expanding = !card.classList.contains('project-card--expanded');

      // 1. Fade out inner content
      card.classList.add('is-animating');

      setTimeout(() => {
        // 2. Swap layout
        card.classList.toggle('project-card--expanded', expanding);

        // 3. Fade back in
        card.classList.remove('is-animating');
        card.classList.add('is-settling');
        card.addEventListener('transitionend', () => {
          card.classList.remove('is-settling');
        }, { once: true });
      }, 220);
    });
  });
})();
