import React, {ReactNode} from 'react';
import styled from 'styled-components';
import {SnackbarProvider, useSnackbar} from '../src/contexts/SnackbarContext';
import {ThemeProvider, useTheme} from '../src/contexts/ThemeContext';
import Snackbar from '../src/components/Snackbar';

const StyledPageContent = styled.div`
    text-align: center;
    margin: 10rem;
`;

const StyledButton = styled.button`
    background-color: ${(props) => (props.theme.darkMode ? '#222' : '#f1f1f1')};
    color: ${(props) => (props.theme.darkMode ? '#f1f1f1' : '#222')};
    padding: 10px 20px;
    margin: 10px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        background-color: ${(props) =>
            props.theme.darkMode ? '#333' : '#ddd'};
    }
`;

const StyledAction = styled.button`
    background-color: ${(props) =>
        props.theme.darkMode ? '#5c2828' : '#ffb7b7'};
    color: ${(props) => (props.theme.darkMode ? '#f1f1f1' : '#222')};
    padding: 10px;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
`;

function PageContent() {
    const {addSnackbar} = useSnackbar();
    const {darkMode, toggleDarkMode} = useTheme();

    const handleClick = ({
        label,
        type,
        trailingAction,
        leadingIcon,
        message,
    }: {
        label: string;
        type: 'error' | 'info' | 'success';
        trailingAction?: ReactNode;
        leadingIcon?: ReactNode;
        message?: string;
    }) => {
        addSnackbar({label, type, trailingAction, leadingIcon, message});
    };

    return (
        <StyledPageContent>
            <h1>Demo</h1>
            <StyledButton
                onClick={() =>
                    handleClick({
                        label: 'This is an error!',
                        type: 'error',
                        trailingAction: <StyledAction>Action</StyledAction>,
                        leadingIcon: (
                            <div>
                                <i className='fa-solid fa-circle-exclamation'></i>
                            </div>
                        ),
                    })
                }
            >
                Show Error Snackbar with Action
            </StyledButton>
            <StyledButton
                onClick={() =>
                    handleClick({label: 'This is successful!', type: 'success'})
                }
            >
                Show Success Snackbar
            </StyledButton>
            <StyledButton
                onClick={() =>
                    handleClick({
                        label: 'This is some info!',
                        type: 'info',
                        message: 'Here is the additional message.',
                    })
                }
            >
                Show Info Snackbar with Message
            </StyledButton>
            <StyledButton onClick={() => toggleDarkMode()}>
                Toggle Dark Mode: {darkMode ? 'On' : 'Off'}
            </StyledButton>
            <Snackbar />
        </StyledPageContent>
    );
}

export default function Page() {
    return (
        <ThemeProvider>
            <SnackbarProvider>
                <PageContent />
            </SnackbarProvider>
        </ThemeProvider>
    );
}
