/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function RotaProtegida() {
    const [autorizado, setAutorizado] = useState(false);
    const [carregando, setCarregando] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const verificarAutenticacao = async () => {
            try {
                // Faz a requisição para verificar autenticação
                // O cookie será enviado automaticamente pelo navegador
                const response = await fetch("http://localhost:3000/api/auth/verify", {
                    credentials: 'include' // Isso é essencial para enviar cookies
                });

                if (!response.ok) {
                    throw new Error("Não autorizado");
                }

                const dados = await response.json();

                if (dados.valid) {
                    setAutorizado(true);
                } else {
                    throw new Error("Autenticação falhou");
                }
            } catch (error) {
                console.error("Erro de autenticação:", error.message);
                setAutorizado(false);
                navigate("/login");
            } finally {
                setCarregando(false);
            }
        };

        verificarAutenticacao();
    }, [navigate]);

    if (carregando) {
        return <div>Carregando...</div>;
    }

    return autorizado ? <Outlet /> : null;
}

export default RotaProtegida;