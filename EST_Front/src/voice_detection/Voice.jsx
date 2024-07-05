import React, { useEffect, useState, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { validateCommand } from '../voice_detection/commands'; // Importa el archivo de validación

function Voice({ onBuyChampion }) {
    const [showOverlay, setShowOverlay] = useState(false);
    const [error, setError] = useState(false);
    const [recognizedCommand, setRecognizedCommand] = useState(false);
    const [hasFocus, setHasFocus] = useState(true);
    const timeoutRef = useRef(null);

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect(() => {
        const handleKeyDown = (event) => {
            // Ctrl + Shift + S para alternar entre iniciar y detener
            if (event.ctrlKey && event.shiftKey && event.key === 'S') {
                if (listening) {
                    stopListening();
                } else {
                    startListening();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [listening]);

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (transcript) {
            timeoutRef.current = setTimeout(() => {
                handleCommand(transcript);
            }, 3000); // 3 segundos
        }

        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, [transcript]);

    const handleCommand = (command) => {
        const result = validateCommand(command);
        if (result.success) {
            setRecognizedCommand(true);
            setTimeout(() => {
                setRecognizedCommand(false);
                resetTranscript();
            }, 3000);
            fetch('http://localhost:5000/api/comando-actual', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comando: command }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Comando actualizado:', data);
                    // Realizar cualquier acción adicional necesaria
                })
                .catch(error => {
                    console.error('Error al actualizar el comando:', error);
                });
        } else {
            setError(true);
            setTimeout(() => {
                setError(false);
                resetTranscript();
            }, 3000);
        }
    };

    const startListening = () => {
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
        setShowOverlay(true);
        const handleVisibilityChange = () => {
            setHasFocus(!document.hidden);
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    };

    const stopListening = () => {
        SpeechRecognition.stopListening();
        setShowOverlay(false);
    };

    const notify = (message) => {
        if (Notification.permission === 'granted') {
            new Notification(message);
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    new Notification(message);
                }
            });
        }
    };

    if (!browserSupportsSpeechRecognition) {
        return <div>Tu navegador no soporta reconocimiento de voz.</div>;
    }

    return (
        <div>
            {showOverlay && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 text-white flex flex-col justify-center items-center z-50 text-2xl text-center backdrop-blur-md">
                    <div className="relative">
                        <button
                            id="speech"
                            className="bg-primary text-white rounded-full w-36 h-36 text-3xl flex items-center justify-center relative"
                            onClick={listening ? stopListening : startListening}
                        >
                            <FontAwesomeIcon icon={faMicrophone} />
                            {listening && <div className="pulse-ring absolute"></div>}
                        </button>
                    </div>

                    <h1 className="text-4xl m-4">Escuchando . . .</h1>
                    <p className={`border border-zinc-900 py-2 px-2 rounded transition-all duration-300 
                                    ${error ? 'bg-red-500' : ''}
                                    ${recognizedCommand ? 'bg-green-500' : 'text-white'}`}>
                    
                    {transcript || 'ㅤ'}
                    </p>
                </div>
            )}
        </div>
    );
}

export default Voice;
