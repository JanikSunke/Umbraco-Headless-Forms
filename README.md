!! This is work in progress

## Umbraco Headless Forms

### Description

Umbraco Headless Forms is a React npm package designed for headless form functionality within Umbraco projects. This package simplifies the process of rendering forms dynamically based on form IDs and submitting the data to Umbraco Forms seamlessly.

### Features

- Render forms dynamically based on form IDs.
- Submit form data to Umbraco Forms via API calls.
- Streamlined integration with Umbraco Forms for headless environments.

### Installation

To install Umbraco Headless Forms, run the following command:

```
npm install umbraco-headless-forms
```

### Getting Started

1. Set up Umbraco Forms in your Umbraco solution.
2. Use the Umbraco Forms API to retrieve form definitions and submit data.
3. Configure forms dynamically based on form IDs for a headless experience.

### Usage

```javascript
import { UmbracoForm } from "umbraco-headless-forms";

// Render a headless form based on form ID
<UmbracoForm formId={formId} baseUrl={baseUrl} apiKey={apiKey} />;

// Submit form data to Umbraco Forms
// Add your submit logic here
```

### Contributions

Contributions are welcome. Please feel free to submit issues, feature requests, or pull requests.

### License

This project is licensed under the [ISC License](https://opensource.org/license/isc-license-txt).

### Author

Janik Sunke

### Contact

For inquiries, reach out to [jssunke@gmail.com](mailto:jssunke@gmail.com).

---

Feel free to explore Umbraco Headless Forms to enhance your form management capabilities in Umbraco projects.
