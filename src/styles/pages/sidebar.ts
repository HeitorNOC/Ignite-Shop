// styles/components/sidebar.ts

import { styled } from "..";

export const SidebarContainer = styled('aside', {
    width: '400px', 
    height: '100vh',
    position: 'fixed',
    top: 0,
    right: 0,
    backgroundColor: '#202024',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1000,
    boxShadow: '-4px 0 15px rgba(0, 0, 0, 0.5)',

    h2: {
        fontSize: '1.5rem',
        color: '#E1E1E6',
        marginBottom: '1.5rem',
    }
});

export const ProductList = styled('div', {
    flex: 1,
    overflowY: 'auto',
    marginTop: '1rem',
    paddingRight: '0.5rem', 
});

export const ProductItem = styled('div', {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1.5rem',
    backgroundColor: '#29292E',
    borderRadius: 8,
    padding: '1rem',

    img: {
        width: '80px', 
        height: '80px',
        borderRadius: 8,
    },
});

export const ProductDetails = styled('div', {
    marginLeft: '1rem',
    display: 'flex',
    flexDirection: 'column',

    strong: {
        fontSize: '1rem',
        color: '#E1E1E6',
    },

    span: {
        fontSize: '0.9rem',
        color: '#A8A8B3',
        marginTop: '0.2rem',
    },

    p: {
        fontSize: '0.9rem',
        color: '#A8A8B3',
        marginTop: '0.2rem',
    },
});

export const RemoveButton = styled('button', {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#F75A68',
    cursor: 'pointer',
    fontSize: '0.9rem',
    marginTop: '0.5rem',
    textAlign: 'left',
});

export const Footer = styled('div', {
    paddingTop: '1.5rem',
    borderTop: '1px solid #323238',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

export const QuantityInfo = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    color: '#C4C4CC',
    marginBottom: '1rem',

    span: {
        fontSize: '0.9rem',
    },

    strong: {
        fontSize: '0.9rem',
    },
});

export const TotalAmount = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    color: '#E1E1E6',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '2rem',

    span: {
        fontSize: '1rem',
    },

    strong: {
        fontSize: '1.2rem',
    },
});

export const CheckoutButton = styled('button', {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#00B37E',
    color: '#FFFFFF',
    fontSize: '1rem',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 'bold',
    textTransform: 'uppercase',
});
