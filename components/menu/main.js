// Utility functions
const $ = (id) => document.getElementById(id);
const create = (tag, attrs = {}, text = '') => {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  if (text) el.textContent = text;
  return el;
};

// Notification module
const notify = (() => {
  const el = $('notify');
  let timer;
  return {
    show: (msg, duration = 2000) => {
      el.textContent = msg;
      el.style.opacity = 1;
      clearTimeout(timer);
      timer = setTimeout(() => el.style.opacity = 0, duration);
    }
  };
})();

// Input creation function
const createInput = (setting) => {
  const wrap = create('div', { class: 'input-wrap' });
  const label = create('label', { for: setting.id, class: 'label' }, setting.label);
  wrap.appendChild(label);

  let input;
  if (setting.type === 'select') {
    input = create('select', { id: setting.id, class: 'input' });
    setting.options.forEach(opt => {
      const option = create('option', { value: opt }, opt);
      input.appendChild(option);
    });
  } else if (setting.type === 'file') {
    input = create('input', { type: 'file', id: setting.id, class: 'input', accept: setting.accept });
  } else if (setting.type === 'color') {
    input = create('input', { type: 'color', id: setting.id, class: 'input' });
  } else if (setting.type === 'range') {
    input = create('input', { type: 'range', id: setting.id, class: 'input', min: setting.min, max: setting.max, step: setting.step, value: setting.value });
    const valueDisplay = create('span', { id: `${setting.id}-value` }, `${input.value}`);
    input.addEventListener('input', () => {
      valueDisplay.textContent = input.value;
    });
    wrap.appendChild(valueDisplay);
  }
  wrap.appendChild(input);
  return wrap;
};

// Feature modules
const features = {
  font: {
    title: "Font",
    settings: [
      { id: "font-face", label: "Font Face", type: "select", options: ["Arial", "Helvetica", "Times New Roman", "Courier New"] },
      { id: "font-style", label: "Font Style", type: "select", options: ["normal", "italic", "oblique"] },
      { id: "font-size", label: "Font Size", type: "range", min: 0, max: 50, step: 2, value: 20 }
    ],
    render: function() {
      const group = create('div', { class: 'group' });
      group.appendChild(create('h2', {}, this.title));
      this.settings.forEach(setting => group.appendChild(createInput(setting)));
      return group;
    },
    apply: function() {
      const face = $('font-face').value;
      const style = $('font-style').value;
      const size = $('font-size').value;
      const allElements = document.querySelectorAll("*");
      document.body.style.fontFamily = `${face}, sans-serif`;
      document.body.style.fontStyle = style;
      allElements.forEach(element => {
        if (!element.matches('h1, h2, h3, h4, h5, h6')) {
          element.style.fontSize = `${size}px`;
        }
      });
    }
  },
  image: {
    title: "Image",
    settings: [
      { id: "profile-pic", label: "Profile Picture", type: "file", accept: "image/*" },
      { id: "bg-pic", label: "Background Picture", type: "file", accept: "image/*" }
    ],
    render: function() {
      const group = create('div', { class: 'group' });
      group.appendChild(create('h2', {}, this.title));
      this.settings.forEach(setting => group.appendChild(createInput(setting)));
      return group;
    },
    apply: function() {
      const bg = $('bg-pic').files[0];
      if (bg) {
        const reader = new FileReader();
        reader.onload = (e) => {
          document.body.style.backgroundImage = `url(${e.target.result})`;
          document.body.style.backgroundRepeat = "no-repeat";
          document.body.style.backgroundAttachment = "fixed";
          document.body.style.backgroundSize = "cover";
          document.body.style.backgroundPosition = "center"
        }
        reader.readAsDataURL(bg);
      }
      // Note: Profile picture handling would typically involve server-side processing
    }
  },
  theme: {
    title: "Theme",
    settings: [
      { id: "theme", label: "Theme", type: "select", options: ["light", "dark", "auto"] },
      { id: "style", label: "App Style", type: "select", options: ["ios", "android"] }
    ],
    render: function() {
      const group = create('div', { class: 'group' });
      group.appendChild(create('h2', {}, this.title));
      this.settings.forEach(setting => group.appendChild(createInput(setting)));
      return group;
    },
    apply: function() {
      const theme = $('theme').value;
      const style = $('style').value;
      document.body.classList.remove('dark-theme', 'android');

      if (style === 'android') document.body.classList.add('android');

      if (theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-theme');
      }
    }
  },
  lang: {
    title: "Language",
    settings: [
      { id: "lang", label: "Language", type: "select", options: ["English", "Bemba"] },
    ],
    render: function() {
      const group = create('div', { class: 'group' });
      group.appendChild(create('h2', {}, this.title));
      this.settings.forEach(setting => group.appendChild(createInput(setting)));
      return group;
    },
    apply: function() {
      const langApply = $('lang').value
      const SettingsTitle = $('SettingsTitle')
      if (langApply === 'Bemba') {
        SettingsTitle.textContent = "Ama Setini"
      } else if (langApply === 'English') {
        SettingsTitle.textContent = "Settings"
      }
    }
  },
};

// Feature toggle function
const enableFeatures = (featureList) => {
  const container = $('settings');
  container.innerHTML = '';
  featureList.forEach(name => {
    if (features[name]) {
      container.appendChild(features[name].render());
    }
  });
};

// Main application logic
const app = (() => {
  const init = () => {
    // Enable all features by default
    enableFeatures(Object.keys(features));

    $('save').addEventListener('click', () => {
      Object.values(features).forEach(feature => feature.apply());
      notify.show('Settings saved successfully!');
    });

    // Initial theme setup
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      $('theme').value = 'auto';
      features.theme.apply();
    }
  };

  return { init };
})();

// Initialize the application
app.init();
