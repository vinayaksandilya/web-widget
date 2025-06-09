

# 🧩 Web Widget — Live Reservation Interface

A fully embeddable **JavaScript booking widget** designed for restaurants and service providers using **Wegsoft**. Built with **Next.js** and **Tailwind CSS**, it allows seamless, real-time reservation scheduling directly from any website.

![Web Widget Screenshot](public/screenshot.png)

---

## 🔗 Live Demo

🌐 [https://webbook.wegsoft.com/](https://webbook.wegsoft.com/)  


---

## ✨ Key Features

- 📅 Real-time table and slot availability
- 🧑‍🍳 Designed for restaurants, cafes, salons, and more
- 🔌 Plug-and-play — just embed a script
- 🖼️ Mobile-first responsive design
- 🎨 Customizable with client branding (logo, color, etc.)
- 🔐 Secure API integration with Wegsoft backend

---

## 🛠 Tech Stack

| Layer       | Technology      |
|-------------|------------------|
| Frontend    | Next.js (React) |
| Styling     | Tailwind CSS    |
| Forms       | Headless UI     |
| Hosting     | Vercel / Node   |

---

## ⚙️ Installation

> For developers embedding the widget:

Include the widget embed script (to be provided by Wegsoft) on your website.

```html
<script src="https://webbook.wegsoft.com/embed.js" defer></script>
<div id="wegsoft-booking-widget"></div>
````

> For contributors:

```bash
git clone https://github.com/vinayaksandilya/web-widget.git
cd web-widget
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the development version.

---

## 🧩 Embed Setup

To embed on client websites:

1. Add the script and widget container.
2. Pass optional attributes like:

   * `data-restaurant-id="abc123"`
   * `data-theme="dark"`
3. Widget will fetch available slots from the Wegsoft backend.

---

## 📁 Project Structure

```
web-widget/
├── components/      # UI components (form, loader, time picker)
├── pages/           # Next.js routing (index.js)
├── public/          # Static files and logos
├── styles/          # Global styles and Tailwind config
├── utils/           # Helper functions and API logic
└── embed.js         # Embed script served for 3rd-party sites
```

---

## 📦 Customization

* Clone the repo and modify branding from `tailwind.config.js` or `components/ThemeWrapper.js`
* Update logo or default branding in `/public/logo.png`
* Theme toggling and config options coming soon


---

## 🤝 Contributing

1. Fork this repository
2. Create a new branch: `git checkout -b feature/custom-theme`
3. Commit your changes
4. Open a pull request

All contributions are welcome — especially UI improvements, performance tuning, and animations!

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for full details.

---

## 🙋 Author

Made with care by [Vinayak Sandilya](https://github.com/vinayaksandilya)
📧 Email: [vinayaksandilya@gmail.com](mailto:vinayaksandilya@gmail.com)
🌐 Portfolio: [vinayaksandilya.com](https://vinayaksandilya.com)

---

> ✨ Want to integrate this widget with your own backend? Contact us for white-labeled solutions at [wegsoft.com](https://wegsoft.com)

---
