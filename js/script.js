(function() {
  'use strict';

  const tiles = [
    // Google
    [
      	{ name: 'gmail', title: 'GMail', href: 'https://mail.google.com/mail/u/0' },
      	{ name: 'google-calendar', title: 'Google Calendar', href: 'https://calendar.google.com/b/0' },
      	{ name: 'google-contacts', title: 'Google Contacts', href: 'https://contacts.google.com/' },
      	{ name: 'google-keep', title: 'Google Keep', href: 'https://keep.google.com' },
      	{ name: 'google-drive', title: 'Google Drive', href: 'https://drive.google.com/u/0' },
      	{ name: 'google-maps', title: 'Google Maps', href: 'https://maps.google.com' },
      	
	{ name: 'Youtube', title: 'Youtube', href: 'https://www.youtube.com' },
      	{ name: 'Translate', title: 'Translate', href: 'https://translate.google.com/' },
      	{ name: '', title: '', href: '' },
      	{ name: '', title: '', href: '' },
      	{ name: '', title: '', href: '' },
      	{ name: '', title: '', href: '' },
    ],

    // Personal
    [
      	{ name: 'facebook', title: 'Facebook', href: 'https://www.facebook.com/' },
      	{ name: 'twitter', title: 'Twitter', href: 'https://www.twitter.com/' },
      	{ name: 'Instagram', title: 'Instagram', href: 'https://www.instagram.com' },
      	{ name: 'in', title: 'LinkedIn', href: 'https://www.linkedin.com' },
      	{ name: 'Flickr', title: 'Flickr', href: 'https://www.flickr.com/'},
	{ name: 'Quora', title: 'Quora', href: 'https://www.quora.com/' },	
	  
	{ name: 'Vimeo', title: 'Vimeo', href: 'https://www.vimeo.com' },
	{ name: 'Tumblr', title: 'Tumblr', href: 'https://www.tumblr.com' },
      	{ name: 'Soundcloud', title: 'Soundcloud', href: 'https://www.soundcloud.com/' },
      	{ name: 'Reddit', title: 'Reddit', href: 'https://www.reddit.com/' },
   	{ name: 'Spotify', title: 'Spotify', href: 'https://www.spotify.com' },
      	{ name: '', title: '', href: '' },
    ],

    // Programming
    [ 	
	{ name: 'Github', title: 'GitHub', href: 'https://www.github.com/' },
	{ name: 'solo', title: 'SoloLearn', href: 'https://www.sololearn.com/' },
	{ name: '', title: '', href: '' },
      	{ name: '', title: '', href: '' },
      	{ name: '', title: '', href: '' },
	{ name: '', title: '', href: '' },
	  
	{ name: '', title: '', href: '' },
      	{ name: '', title: '', href: '' },
      	{ name: '', title: '', href: '' },
	{ name: '', title: '', href: '' },
      	{ name: '', title: '', href: '' },
      	{ name: '', title: '', href: '' },
	],  
  ];

  // Some really cool animations are:
  // flip, swing, jackInTheBox, rotateIn, tada, zoomIn, bounceInUp, flipInX,  flipInY, pulse
  const animation = 'jackInTheBox';

  // HTML elements on the page
  const elements = {
    tabs: document.getElementById('tabs'),
    tileList: document.getElementById('tileList'),
    tiles: document.querySelectorAll('li.tile'),
  };


  /**
   * One-time code that runs when the page first loads
   */
  function onLoad() {
    // If a specific tab has been specified, then select it; otherwise, default to the first tab
    let tab = getHashTab() || 1;
    selectTab(tab);

    // Allow tabs to be selected by clicking the icon or pressing the corresponding number key
    elements.tabs.addEventListener('click', selectTabOnClick);
    window.addEventListener('keypress', selectTabOnKeyPress);
    window.addEventListener('hashchange', selectTabOnHashChange);

    // Remove animation classes when the animation finishes
    for (let tileElement of elements.tiles) {
      tileElement.addEventListener('animationend', animationFinished);
    }
  }


  /**
   * Toggles HTML attributes to the corresponding tab.  For example, if tab === 1,
   * then attributes like data-href-1 and data-src-1 will be activated.  If tab === 2,
   * then attributes like data-href-2 and data-src-2 will be activated.
   */
  function selectTab(tab) {
    if (tiles.length - 1 < tab) {
      return;
    }

    elements.tabs.className = `tabs tab-${tab}`;
    location.hash = `#tab-${tab}`;

    for (let [index, tileElement] of Object.entries(elements.tiles)) {
      let tile = tiles[tab][index] || {};

      tileElement.className = `tile ${tile.name}`;
      tileElement.classList.add('animated', animation);

      let anchorElement = tileElement.children[0];
      anchorElement.href = tile.href;
      anchorElement.title = tile.title;

      let imageElement = anchorElement.children[0];
      if (tile.name) {
        imageElement.classList.remove('hidden');
		//for old uncomment this
        //imageElement.src = `img/tiles/${tile.name}-icon.png`;
		//for new uncomment this
        imageElement.src = `img/tiles/${tile.name}.png`;
      }
      else {
        imageElement.classList.add('hidden');
      }
    }
  }


  function animationFinished(event) {
    event.target.classList.remove('animated', animation);
  }


  /**
   * Whenever a tab icon is clicked, selects the corresponding tab
   */
  function selectTabOnClick(event) {
    if (event.target) {
      let tab = event.target.getAttribute('data-tab');
      if (tab) {
        selectTab(parseInt(tab));
      }
    }
  }


  /**
   * Whenever a number key is pressed, selects the corresponding tab
   */
  function selectTabOnKeyPress(event) {
    if (/\d/.test(event.key)) {
      // It's a number key, so select the corresponding tab
      selectTab(parseInt(event.key) - 1);
    }
  }


  /**
   * Whenever the URL hash changes, select the corresponding tab
   */
  function selectTabOnHashChange() {
    let tab = getHashTab();
    if (tab !== undefined) {
      selectTab(tab);
    }
  }

  /**
   * Returns the tab number from the URL hash
   */
  function getHashTab() {
    let match = /tab-(\d)/.exec(location.hash);
    if (match) {
      return parseInt(match[1]);
    }
  }


  window.onload = onLoad;
}())
