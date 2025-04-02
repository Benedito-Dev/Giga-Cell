import { useState } from 'react';
import Logo from '../images/logo.png';
import imgGiga from '../images/imgG.png';

function Login() {
    const [activeTab, setActiveTab] = useState('login');
    const [formData, setFormData] = useState({
        // Campos de cadastro
        nomeCompleto: '',
        email: '',
        cpf: '',
        telefone: '',
        endereco: '',
        senha: '',
        confirmarSenha: '',
        
        // Campos de login
        loginEmail: '',
        loginSenha: ''
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Limpa erros quando o usuário começa a digitar
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = {...prev};
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateCpf = (cpf) => {
        // Validação básica de CPF (pode ser substituída por uma validação mais robusta)
        return cpf.replace(/\D/g, '').length === 11;
    };

    const validatePhone = (phone) => {
        // Validação básica de telefone
        return phone.replace(/\D/g, '').length >= 10;
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const newErrors = {};
        
        // Validações
        if (!formData.nomeCompleto.trim()) newErrors.nomeCompleto = 'Nome completo é obrigatório';
        if (!formData.email.includes('@')) newErrors.email = 'E-mail inválido';
        if (!validateCpf(formData.cpf)) newErrors.cpf = 'CPF inválido';
        if (!validatePhone(formData.telefone)) newErrors.telefone = 'Telefone inválido';
        if (!formData.endereco.trim()) newErrors.endereco = 'Endereço é obrigatório';
        if (formData.senha.length < 6) newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
        if (formData.senha !== formData.confirmarSenha) newErrors.confirmarSenha = 'Senhas não coincidem';
        
        setErrors(newErrors);
        
        if (Object.keys(newErrors).length === 0) {
            // Simulação de cadastro bem-sucedido
            console.log('Dados para cadastro:', {
                nomeCompleto: formData.nomeCompleto,
                email: formData.email,
                cpf: formData.cpf.replace(/\D/g, ''),
                telefone: formData.telefone.replace(/\D/g, ''),
                endereco: formData.endereco,
                senha: formData.senha // Na prática, isso seria um hash
            });
            
            setSuccessMessage('Cadastro realizado com sucesso!');
            setTimeout(() => {
                setSuccessMessage('');
                setActiveTab('login');
            }, 3000);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const newErrors = {};
        
        if (!formData.loginEmail.includes('@')) newErrors.loginEmail = 'E-mail inválido';
        if (formData.loginSenha.length < 6) newErrors.loginSenha = 'Senha inválida';
        
        setErrors(newErrors);
        
        if (Object.keys(newErrors).length === 0) {
            // Simulação de login bem-sucedido
            console.log('Dados para login:', {
                email: formData.loginEmail,
                senha: formData.loginSenha // Na prática, isso seria comparado com um hash
            });
            
            alert('Login bem-sucedido!');
        }
    };

    const formatCpf = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    };

    const formatPhone = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');
    };

    const [step, setStep] = useState(1); // Controle das etapas do cadastro

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-md w-full max-w-3xl flex overflow-hidden">
    
                {/* Inverte a posição da imagem no cadastro */}
                {activeTab === 'register' ? (
                    <>
                        {/* Formulário - Lado Esquerdo no Cadastro */}
                        <div className="w-full md:w-1/2 p-6">
                            <div className="flex justify-center mb-4">
                                <img src={Logo} alt="Logo" className="h-12" />
                            </div>
    
                            {/* Abas */}
                            <div className="flex border-b">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('login')}
                                    className="flex-1 py-4 font-medium text-sm text-gray-500 hover:text-gray-700"
                                >
                                    Login
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('register')}
                                    className="flex-1 py-4 font-medium text-sm text-blue-600 border-b-2 border-blue-600"
                                >
                                    Cadastro
                                </button>
                            </div>
    
                            {/* Formulário de Cadastro com etapas */}
                            <div className="mt-6">
                                {step === 1 && (
                                    <div>
                                        <h2 className="text-lg font-semibold mb-4">Dados Pessoais</h2>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
                                            <input type="text" className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md" placeholder="Seu nome completo" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">E-mail</label>
                                            <input type="email" className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md" placeholder="seu@email.com" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">CPF</label>
                                            <input type="text" className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md" placeholder="000.000.000-00" />
                                        </div>
                                        <button onClick={() => setStep(2)} className="w-full bg-blue-600 text-white py-2 rounded-md">Próximo</button>
                                    </div>
                                )}
    
                                {step === 2 && (
                                    <div>
                                        <h2 className="text-lg font-semibold mb-4">Endereço</h2>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">Telefone</label>
                                            <input type="text" className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md" placeholder="(00) 00000-0000" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">Endereço Completo</label>
                                            <input type="text" className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md" placeholder="Rua, número, bairro, cidade" />
                                        </div>
                                        <div className="flex justify-between">
                                            <button onClick={() => setStep(1)} className="bg-gray-400 text-white py-2 px-4 rounded-md">Voltar</button>
                                            <button onClick={() => setStep(3)} className="bg-blue-600 text-white py-2 px-4 rounded-md">Próximo</button>
                                        </div>
                                    </div>
                                )}
    
                                {step === 3 && (
                                    <div>
                                        <h2 className="text-lg font-semibold mb-4">Senha</h2>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">Senha</label>
                                            <input type="password" className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md" placeholder="Mínimo 6 caracteres" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">Confirmar Senha</label>
                                            <input type="password" className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md" placeholder="Digite a senha novamente" />
                                        </div>
                                        <div className="flex justify-between">
                                            <button onClick={() => setStep(2)} className="bg-gray-400 text-white py-2 px-4 rounded-md">Voltar</button>
                                            <button className="bg-green-600 text-white py-2 px-4 rounded-md">Finalizar Cadastro</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
    
                        {/* Imagem - Lado Direito no Cadastro */}
                        <div className="w-1/2 hidden md:block">
                            <img src={imgGiga} alt="Imagem de Cadastro" className="w-full h-full object-cover" />
                        </div>
                    </>
                ) : (
                    <>
                        {/* Imagem - Lado Esquerdo no Login */}
                        <div className="w-1/2 hidden md:block">
                            <img src="URL_DA_IMAGEM" alt="Imagem de Login" className="w-full h-full object-cover" />
                        </div>
    
                        {/* Formulário - Lado Direito no Login */}
                        <div className="w-full md:w-1/2 p-6">
                            <div className="flex justify-center mb-4">
                                <img src={Logo} alt="Logo" className="h-12" />
                            </div>
    
                            {/* Abas */}
                            <div className="flex border-b">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('login')}
                                    className="flex-1 py-4 font-medium text-sm text-blue-600 border-b-2 border-blue-600"
                                >
                                    Login
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('register')}
                                    className="flex-1 py-4 font-medium text-sm text-gray-500 hover:text-gray-700"
                                >
                                    Cadastro
                                </button>
                            </div>
    
                            {/* Formulário de Login */}
                            <div className="mt-6">
                                <h2 className="text-lg font-semibold mb-4">Acesse sua conta</h2>
                                <form>
                                    <input type="email" className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md mb-4" placeholder="E-mail" />
                                    <input type="password" className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md mb-4" placeholder="Senha" />
                                    <button className="w-full bg-blue-600 text-white py-2 rounded-md">Entrar</button>
                                </form>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
    

}

export default Login;