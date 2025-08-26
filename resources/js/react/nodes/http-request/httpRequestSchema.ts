import { RJSFSchema, UiSchema } from '@rjsf/utils';

export const httpRequestSchema: RJSFSchema = {
  title: 'HTTP Request Configuration',
  description: 'Configure your HTTP request parameters',
  type: 'object',
  required: ['method', 'url'],
  properties: {
    method: {
      type: 'string',
      title: 'HTTP Method',
      enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      default: 'GET'
    },
    url: {
      type: 'string',
      title: 'URL',
      format: 'uri',
      description: 'The endpoint URL for the HTTP request'
    },
    queryParams: {
      type: 'array',
      title: 'Query Parameters',
      items: {
        type: 'object',
        properties: {
          key: {
            type: 'string',
            title: 'Parameter Name'
          },
          value: {
            type: 'string',
            title: 'Parameter Value'
          }
        },
        required: ['key', 'value']
      },
      default: []
    },
    headers: {
      type: 'array',
      title: 'Headers',
      items: {
        type: 'object',
        properties: {
          key: {
            type: 'string',
            title: 'Header Name'
          },
          value: {
            type: 'string',
            title: 'Header Value'
          }
        },
        required: ['key', 'value']
      },
      default: []
    },
    auth: {
      type: 'object',
      title: 'Authentication',
      properties: {
        type: {
          type: 'string',
          title: 'Authentication Type',
          enum: ['none', 'basic', 'bearer'],
          default: 'none'
        }
      },
      required: ['type'],
      dependencies: {
        type: {
          oneOf: [
            {
              properties: {
                type: { const: 'none' }
              }
            },
            {
              properties: {
                type: { const: 'basic' },
                username: {
                  type: 'string',
                  title: 'Username'
                },
                password: {
                  type: 'string',
                  title: 'Password'
                }
              },
              required: ['username', 'password']
            },
            {
              properties: {
                type: { const: 'bearer' },
                token: {
                  type: 'string',
                  title: 'Bearer Token'
                }
              },
              required: ['token']
            }
          ]
        }
      }
    },
    body: {
      type: 'object',
      title: 'Request Body',
      properties: {
        contentType: {
          type: 'string',
          title: 'Content Type',
          enum: ['none', 'application/json', 'application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain'],
          default: 'none'
        }
      },
      dependencies: {
        contentType: {
          oneOf: [
            {
              properties: {
                contentType: { const: 'none' }
              }
            },
            {
              properties: {
                contentType: { not: { const: 'none' } },
                content: {
                  type: 'string',
                  title: 'Body Content'
                }
              },
              required: ['content']
            }
          ]
        }
      }
    },
    options: {
      type: 'object',
      title: 'Request Options',
      properties: {
        followRedirects: {
          type: 'boolean',
          title: 'Follow Redirects',
          description: 'Automatically follow HTTP redirects',
          default: true
        },
        verifySSL: {
          type: 'boolean',
          title: 'Verify SSL Certificates',
          description: 'Verify SSL certificates for HTTPS requests',
          default: true
        }
      }
    }
  }
};

export const httpRequestUiSchema: UiSchema = {
  method: {
    'ui:widget': 'select'
  },
  url: {
    'ui:placeholder': 'https://api.example.com/endpoint'
  },
  queryParams: {
    'ui:options': {
      addable: true,
      removable: true,
      orderable: false
    },
    items: {
      'ui:options': {
        inline: true
      },
      key: {
        'ui:placeholder': 'Parameter name'
      },
      value: {
        'ui:placeholder': 'Parameter value'
      }
    }
  },
  headers: {
    'ui:options': {
      addable: true,
      removable: true,
      orderable: false
    },
    items: {
      'ui:options': {
        inline: true
      },
      key: {
        'ui:placeholder': 'Header name'
      },
      value: {
        'ui:placeholder': 'Header value'
      }
    }
  },
  auth: {
    type: {
      'ui:widget': 'select'
    },
    password: {
      'ui:widget': 'password'
    },
    token: {
      'ui:placeholder': 'Enter bearer token'
    },
    username: {
      'ui:placeholder': 'Enter username'
    }
  },
  body: {
    contentType: {
      'ui:widget': 'select'
    },
    content: {
      'ui:widget': 'textarea',
      'ui:options': {
        rows: 5
      },
      'ui:placeholder': 'Enter request body'
    }
  },
  options: {
    followRedirects: {
      'ui:widget': 'checkbox'
    },
    verifySSL: {
      'ui:widget': 'checkbox'
    }
  }
};

// Default form data that matches the schema
export const defaultHttpRequestData = {
  method: 'GET',
  url: '',
  queryParams: [],
  headers: [],
  auth: {
    type: 'none'
  },
  body: {
    contentType: 'none'
  },
  options: {
    followRedirects: true,
    verifySSL: true
  }
};
