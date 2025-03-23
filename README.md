# Umbraco Headless Forms

[![npm version](https://badge.fury.io/js/umbraco-headless-forms.svg)](https://www.npmjs.com/package/umbraco-headless-forms)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A React component library for seamlessly integrating Umbraco Forms into headless applications. This package provides a simple way to render and handle Umbraco Forms dynamically, making it perfect for headless CMS implementations.

## Overview

Umbraco Headless Forms simplifies the process of:
- Rendering Umbraco Forms dynamically in React applications
- Handling form submissions through the Umbraco Forms API
- Managing form validation and conditional field logic
- Providing a consistent user experience across headless implementations

### Features

- Render forms dynamically based on form IDs.
- Submit form data to Umbraco Forms via API calls.
- Streamlined integration with Umbraco Forms for headless environments.
- Conditional rendering of form fields based on field rules.

### Supported Form Fields

| Form Field                       | Supported |
| -------------------------------- | --------- |
| Short answer                     | ✅        |
| Long answer                      | ✅        |
| Dropdown                         | ✅        |
| File upload                      | ✅        |
| Checkbox                         | ✅        |
| Date                             | ✅        |
| Multiple choice                  | ✅        |
| Single choice                    | ✅        |
| Password                         | ✅        |
| Data Consent                     | ✅        |
| Title and description            | ✅        |
| Rich text                        | ✅        |
| Hidden                           | ✅        |
| Recaptcha V2 (google)            | ❌        |
| Recaptcha V3 with Score (google) | ❌        |

### Prerequisites

- Node.js 16.x or higher
- React 16.8+ (for Hooks support)
- An Umbraco CMS instance with Umbraco Forms installed
- Umbraco Forms API enabled and configured

### Installation

Using npm:
```bash
npm install umbraco-headless-forms
```

Using yarn:
```bash
yarn add umbraco-headless-forms
```

### Getting Started

1. Set up Umbraco Forms in your Umbraco CMS.
2. Enable Umbraco Forms API in your Umbraco CMS.
3. Create a Umbraco Forms form.
4. Get the form ID from the Umbraco Forms form.
5. Get the API key from the Umbraco Forms API.
6. Paste the formId, umbracoUrl and apiKey into the UmbracoForm component.

### Usage

Use it in a existing React project or create a new [React project](https://react.dev/learn/creating-a-react-app).

```javascript
import { UmbracoForm } from "umbraco-headless-forms";

// Form will be rendered with buttons, pages and fields based on form ID
export default function App() {
  return <UmbracoForm formId={formId} baseUrl={baseUrl} apiKey={apiKey} />;
}
```

### Styling

Overwrite the default styles with your own styles.

```css
.umb-h-form {
  /* targeting <form> element */
}

.umb-h-submit {
  /* targeting <button type="submit"> tag */
}

.umb-h-button {
  /* targeting <button> tag eg. Next, Previous page */
}

.umb-h-input {
  /* targeting <input> tag */
}

.umb-h-select {
  /* targeting <select> tag */
}

.umb-h-h4 {
  /* targeting <h4>, form header */
}

.umb-h-footer {
  /* Targeting div containing submit and paging buttons */
}

.umb-h-fieldCaption {
  /* Targeting <label> tag */
}

.umb-h-legend {
  /* Targeting <legend> tag */
}

.umb-h-indicator {
  /* Targeting Required* / Optional, symbol can be set in Umbraco Forms */
}

.umb-h-helpText {
  /* Targeting help text beneath input */
}

.umb-h-requiredMessage {
  /* Targeting required message */
}

.umb-h-patternInvalidMessage {
  /* Targeting pattern invalid message */
}

.umb-h-container {
  /* Targeting container */
}

.umb-h-pageSelector {
  /* Targeting page selector */
}

.umb-h-messageOnSubmit {
  /* Targeting message on submit */
}

.umb-h-validationSummary {
  /* Targeting validation summary */
}
```

### Contributions

Please feel free to submit issues, feature requests, or pull requests.

### License

This project is licensed under the [ISC License](https://opensource.org/license/isc-license-txt).

### Complete Example

```jsx
import { UmbracoForm } from "umbraco-headless-forms";

export default function App() {
  return (
    <div className="my-form-container">
      <UmbracoForm
        formId="your-form-id"
        baseUrl="https://your-umbraco-instance.com"
        apiKey="your-api-key"
      />
    </div>
  );
}
```

### Author

Janik Sunke

### Contact

For inquiries, reach out to [jssunke@gmail.com](mailto:jssunke@gmail.com).
