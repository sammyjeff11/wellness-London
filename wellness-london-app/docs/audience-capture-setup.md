# Audience capture setup

The contact, listing and partnership pages are live-ready but intentionally do not collect or transmit personal data until the relevant services are connected.

## Business inbox

Set this public environment variable in Vercel once the Well+ business email exists:

```text
NEXT_PUBLIC_CONTACT_EMAIL=hello@your-domain.co.uk
```

The enquiry forms will then prepare a structured email in the visitor's own email application. The website does not store the submitted details.

## Newsletter provider

Create a mailing-list form with the chosen newsletter provider, then set its form action URL:

```text
NEXT_PUBLIC_NEWSLETTER_FORM_ACTION=https://provider.example/form-action
```

The form sends these fields:

- `email`
- `source`

Until the variable is configured, newsletter fields remain visibly disabled and explain that signup is opening shortly.

## Analytics events

The implementation emits:

- `newsletter_signup_submit`
- `inquiry_form_submit`

Each event includes the page or module source. Enquiry events also include the enquiry kind and selected enquiry type.
