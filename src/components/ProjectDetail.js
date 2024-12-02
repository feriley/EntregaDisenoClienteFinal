class ProjectDetail extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" }); // Encapsulamos el DOM
    }
  
    connectedCallback() {
      const projectName = this.getAttribute("project-name") || "No Name";
      const description = this.getAttribute("description") || "No Description";
      const picture = this.getAttribute("picture") || "./img/default.png";
      const repositoryUrl = this.getAttribute("repository-url") || "#";
  
      this.shadowRoot.innerHTML = `
        <style>
          .modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            padding: 20px;
            border-radius: 8px;
            z-index: 1000;
            width: 80%;
            max-width: 500px;
          }
          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
          }
          .close-btn {
            background: red;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
          }
        </style>
        <div class="overlay"></div>
        <div class="modal">
          <button class="close-btn">Cerrar</button>
          <h2>${projectName}</h2>
          <img src="${picture}" alt="${projectName}" style="width: 100%; height: auto;" />
          <p>${description}</p>
          <a href="${repositoryUrl}" target="_blank">Ver Repositorio</a>
        </div>
      `;
  
      this.shadowRoot.querySelector(".close-btn").addEventListener("click", () => {
        this.remove();
      });
  
      this.shadowRoot.querySelector(".overlay").addEventListener("click", () => {
        this.remove();
      });
    }
  }
  
  // Registrar el componente
  customElements.define("project-detail", ProjectDetail);
  