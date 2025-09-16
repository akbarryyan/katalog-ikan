interface MetaData {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
}

class MetaManager {
  static updateTitle(title: string): void {
    document.title = title;
    console.log("🏷️ Document title updated:", title);
  }

  static updateMeta(name: string, content: string): void {
    let metaTag = document.querySelector(
      `meta[name="${name}"]`
    ) as HTMLMetaElement;

    if (metaTag) {
      metaTag.content = content;
    } else {
      // Create new meta tag if it doesn't exist
      metaTag = document.createElement("meta");
      metaTag.name = name;
      metaTag.content = content;
      document.head.appendChild(metaTag);
    }

    console.log(`🏷️ Meta ${name} updated:`, content);
  }

  static updateAllMeta(metaData: MetaData): void {
    if (metaData.title) {
      this.updateTitle(metaData.title);
    }

    if (metaData.description) {
      this.updateMeta("description", metaData.description);
    }

    if (metaData.keywords) {
      this.updateMeta("keywords", metaData.keywords);
    }

    if (metaData.author) {
      this.updateMeta("author", metaData.author);
    }
  }

  static updateOpenGraph(
    title: string,
    description: string,
    image?: string
  ): void {
    // Update Open Graph meta tags for social media sharing
    this.updateMeta("og:title", title);
    this.updateMeta("og:description", description);
    this.updateMeta("og:type", "website");

    if (image) {
      this.updateMeta("og:image", image);
    }

    console.log("📱 Open Graph meta tags updated");
  }
}

export default MetaManager;
