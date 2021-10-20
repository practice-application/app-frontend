export const components = {
    MuiCssBaseline: {
        '@global': {
        }
    },
    MuiCard: {
        styleOverrides: {
            root: {
                width: '100%'
            }
        }
    },
    MuiBreadcrumbs: {
        styleOverrides: {
            root: {
                paddingTop: '8px',
                fontSize: '0.875rem',
            },
        },
    },
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: '0.25rem',
            },
            contained: {
                disableElevation: true,
                borderRadius: '0.25rem',
                boxShadow: 'none',
                '&:hover': {
                    boxShadow: 'none',
                },
            },
            textSizeSmall: {
                fontSize: '0.8rem',
            },
        },
    },
    MuiCardActions: {
        styleOverrides: {
            root: {
                justifyContent: 'space-between'
            }
        }
    },
    MuiCardHeader: {
        styleOverrides: {
            title: {
                fontWeight: 800,
                fontSize: '1.125rem',
                lineHeight: 1.125,
                letterSpacing: '0.025em',
                color: '#0C1451',
            },
            subheader: {
                paddingTop: '0.75rem',
                fontWeight: 400,
                fontSize: '0.875rem',
                lineHeight: 1.5,
            }
        }
    },
    MuiChip: {
        styleOverrides: {
            root: {
                fontSize: '0.625rem',
                borderRadius: '0.25rem',
            }
        }
    },
    MuiLink: {
        styleOverrides: {
            root: {
                color: '#2F76DF',
            },
        }
    },
    MuiPaper: {
        styleOverrides: {
            rounded: {
                borderRadius: '0.25rem',
            },
            elevation1: {
                boxShadow: '2px 2px 2px rgba(126, 143, 158, 0.1)',
            },
            elevation2: {
                boxShadow: '2px 2px 2px rgba(126, 143, 158, 0.1)',
                backgroundColor: '#ffffff'
            },
            elevation9: {
                boxShadow: '0px 2px 20px rgba(235, 239, 244, 0.8)',
            },
        }
    },
    MuiStepConnector: {
        styleOverrides: {
            line: {
                borderStyle: 'none',
            },
            lineVertical: {
                borderLeftStyle: 'none',
            },
        }
    },
    MuiStepLabel: {
        styleOverrides: {
            label: {
                fontWeight: 600,
                fontSize: '0.875rem',
                '&.MuiStepLabel-active': {
                    fontWeight: 600,
                    color: '#0C1451',
                },
                '&.MuiStepLabel-completed': {
                    fontWeight: 600,
                    // color: '#0C1451',
                },
            },
        }
    },
    MuiTypography: {
        styleOverrides: {
            gutterBottom: {
                marginBottom: '1em',
            },
        }
    },
    MuiListItemText: {
        styleOverrides: {
            primary: {
                fontSize: '0.9rem',
                fontWeight: 600,
                color: '#0C1451',
                lineHeight: 1.43,
            },
        }
    }
}
