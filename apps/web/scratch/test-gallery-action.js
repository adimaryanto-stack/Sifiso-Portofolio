const { getAllImages } = require("../src/lib/actions/gallery");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.local" });

async function testAction() {
  try {
    const result = await getAllImages();
    if (result.success) {
      console.log("Success! Total images retrieved:", result.images.length);
      const readOnly = result.images.filter(img => img.isReadOnly);
      const editable = result.images.filter(img => !img.isReadOnly);
      console.log(`Read-only assets (Thumbnails, covers, heroes): ${readOnly.length}`);
      console.log(`Editable assets (Project images): ${editable.length}`);
      if (result.images.length > 0) {
        console.log("First image sample:", JSON.stringify(result.images[0], null, 2));
      }
    } else {
      console.error("Action failed:", result.error);
    }
  } catch (err) {
    console.error("Exception:", err);
  }
}

testAction();
