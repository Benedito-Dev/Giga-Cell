import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login, register } from '../services/auth';
import Logo from '../images/logo.png';
import imgGiga from '../images/imgG.png';

function Login() {
    const [activeTab, setActiveTab] = useState('login');
    const [formData, setFormData] = useState({
        // Campos de cadastro
        nome: '',
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
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Formatação automática para CPF e Telefone
        let formattedValue = value;
        if (name === 'cpf') {
            formattedValue = formatCpf(value);
        } else if (name === 'telefone') {
            formattedValue = formatPhone(value);
        }
        
        setFormData(prev => ({
            ...prev,
            [name]: formattedValue
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
        return cpf.replace(/\D/g, '').length === 11;
    };

    const validatePhone = (phone) => {
        return phone.replace(/\D/g, '').length >= 10;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const newErrors = {};
        
        // Validações
        if (!formData.nome.trim()) newErrors.nome = 'Nome completo é obrigatório';
        if (!formData.email.includes('@')) newErrors.email = 'E-mail inválido';
        if (!validateCpf(formData.cpf)) newErrors.cpf = 'CPF inválido';
        if (!validatePhone(formData.telefone)) newErrors.telefone = 'Telefone inválido';
        if (!formData.endereco.trim()) newErrors.endereco = 'Endereço é obrigatório';
        if (formData.senha.length < 6) newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
        if (formData.senha !== formData.confirmarSenha) newErrors.confirmarSenha = 'Senhas não coincidem';
        
        setErrors(newErrors);
        
        if (Object.keys(newErrors).length === 0) {
            try {
                const userData = {
                    nome: formData.nome,
                    email: formData.email,
                    cpf: formData.cpf.replace(/\D/g, ''),
                    telefone: formData.telefone.replace(/\D/g, ''),
                    endereco: formData.endereco,
                    senha: formData.senha
                };
                
                await register(userData);
                
                setSuccessMessage('Cadastro realizado com sucesso!');
                setTimeout(() => {
                    setSuccessMessage('');
                    setActiveTab('login');
                    setFormData(prev => ({
                        ...prev,
                        loginEmail: formData.email,
                        loginSenha: ''
                    }));
                }, 3000);
            } catch (error) {
                setErrors({ submit: error.message });
            }
        }
        setIsLoading(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const newErrors = {};

        if (!formData.loginEmail.includes('@')) newErrors.loginEmail = 'E-mail inválido';
        if (formData.loginSenha.length < 6) newErrors.loginSenha = 'Senha inválida';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await login(formData.loginEmail, formData.loginSenha);

                // A API retorna { usuario, token }
                const { usuario, token } = response;

                console.log('usuario', usuario)
                console.log('token', token)

                // Armazena o token (para proteger rotas)
                localStorage.setItem('token', token);

                // Opcional: armazenar dados do usuário também
                localStorage.setItem('usuario', JSON.stringify(usuario));

                // Redirecionar após login bem-sucedido
                navigate('/');

            } catch (error) {
                setErrors({ submit: error.message || 'Erro ao fazer login' });
            }
        }

        setIsLoading(false);
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

    const [step, setStep] = useState(1);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <Link to="/">
            <button 
                className="absolute top-4 left-4 flex items-center text-blue-800 hover:text-blue-600 transition-colors duration-200 z-10"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-6 h-6 mr-2"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" 
                    />
                </svg>
                <span className="font-medium">Voltar para a Página principal</span>
            </button>
            </Link>
            
            <div className="bg-white rounded-lg shadow-md w-full max-w-3xl flex overflow-hidden">
                {activeTab === 'register' ? (
                    <>
                        <div className="w-full md:w-1/2 p-6">
                            <div className="flex justify-center mb-4">
                                <img src={Logo} alt="Logo" className="h-12" />
                            </div>
    
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
    
                            <div className="mt-6">
                                <div className="flex justify-between mb-6 relative">
                                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
                                    
                                    {[1, 2, 3].map((stepNumber) => (
                                        <div key={stepNumber} className="flex flex-col items-center z-10">
                                            <div 
                                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${step === stepNumber ? 'bg-blue-600 text-white scale-110' : step > stepNumber ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                                            >
                                                {stepNumber}
                                            </div>
                                            <span className={`text-xs mt-1 ${step === stepNumber ? 'font-medium text-blue-600' : 'text-gray-500'}`}>
                                                {stepNumber === 1 ? 'Dados' : stepNumber === 2 ? 'Endereço' : 'Senha'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
    
                                {step === 1 && (
                                    <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
                                            <input 
                                                type="text" 
                                                name="nome"
                                                value={formData.nome}
                                                onChange={handleChange}
                                                className="w-full text-black px-4 py-2 border border-gray-300 bg-gray-100 rounded-md" 
                                                placeholder="Seu nome completo" 
                                            />
                                            {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">E-mail</label>
                                            <input 
                                                type="email" 
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full text-black px-4 py-2 border border-gray-300 bg-gray-100 rounded-md" 
                                                placeholder="seu@email.com" 
                                            />
                                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">CPF</label>
                                            <input 
                                                type="text" 
                                                name="cpf"
                                                value={formData.cpf}
                                                onChange={handleChange}
                                                className="w-full text-black px-4 py-2 border border-gray-300 bg-gray-100 rounded-md" 
                                                placeholder="000.000.000-00" 
                                                maxLength="14"
                                            />
                                            {errors.cpf && <p className="text-red-500 text-xs mt-1">{errors.cpf}</p>}
                                        </div>
                                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
                                            Próximo
                                        </button>
                                    </form>
                                )}
    
                                {step === 2 && (
                                    <form onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">Telefone</label>
                                            <input 
                                                type="text" 
                                                name="telefone"
                                                value={formData.telefone}
                                                onChange={handleChange}
                                                className="w-full text-black px-4 py-2 border border-gray-300 bg-gray-100 rounded-md" 
                                                placeholder="(00) 00000-0000" 
                                                maxLength="15"
                                            />
                                            {errors.telefone && <p className="text-red-500 text-xs mt-1">{errors.telefone}</p>}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">Endereço Completo</label>
                                            <input 
                                                type="text" 
                                                name="endereco"
                                                value={formData.endereco}
                                                onChange={handleChange}
                                                className="w-full text-black px-4 py-2 border border-gray-300 bg-gray-100 rounded-md" 
                                                placeholder="Rua, número, bairro, cidade" 
                                            />
                                            {errors.endereco && <p className="text-red-500 text-xs mt-1">{errors.endereco}</p>}
                                        </div>
                                        <div className="flex justify-between">
                                            <button 
                                                type="button" 
                                                onClick={() => setStep(1)} 
                                                className="bg-gray-400 text-white py-2 px-4 rounded-md"
                                            >
                                                Voltar
                                            </button>
                                            <button 
                                                type="submit" 
                                                className="bg-blue-600 text-white py-2 px-4 rounded-md"
                                            >
                                                Próximo
                                            </button>
                                        </div>
                                    </form>
                                )}
    
                                {step === 3 && (
                                    <form onSubmit={handleRegister}>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 rounded-md mb-4">Senha</label>
                                            <input 
                                                type="password" 
                                                name="senha"
                                                value={formData.senha}
                                                onChange={handleChange}
                                                className="w-full text-black px-4 py-2 border border-gray-300 bg-gray-100 rounded-md" 
                                                placeholder="Mínimo 6 caracteres" 
                                            />
                                            {errors.senha && <p className="text-red-500 text-xs mt-1">{errors.senha}</p>}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 rounded-md mb-4">Confirmar Senha</label>
                                            <input 
                                                type="password" 
                                                name="confirmarSenha"
                                                value={formData.confirmarSenha}
                                                onChange={handleChange}
                                                className="w-full text-black px-4 py-2 border border-gray-300 bg-gray-100 rounded-md" 
                                                placeholder="Digite a senha novamente" 
                                            />
                                            {errors.confirmarSenha && <p className="text-red-500 text-xs mt-1">{errors.confirmarSenha}</p>}
                                        </div>
                                        <div className="flex justify-between">
                                            <button 
                                                type="button" 
                                                onClick={() => setStep(2)} 
                                                className="bg-gray-400 text-white py-2 px-4 rounded-md"
                                            >
                                                Voltar
                                            </button>
                                            <button 
                                                type="submit" 
                                                className="bg-green-600 text-white py-2 px-4 rounded-md"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? 'Processando...' : 'Finalizar Cadastro'}
                                            </button>
                                        </div>
                                        {successMessage && (
                                            <div className="mt-4 p-2 bg-green-100 text-green-700 rounded text-center">
                                                {successMessage}
                                            </div>
                                        )}
                                        {errors.submit && (
                                            <div className="mt-4 p-2 bg-red-100 text-red-700 rounded text-center">
                                                {errors.submit}
                                            </div>
                                        )}
                                    </form>
                                )}
                            </div>
                        </div>
    
                        <div className="w-1/2 hidden md:block">
                            <img src={imgGiga} alt="Imagem de Cadastro" className="w-full h-full object-cover" />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-1/2 hidden md:block">
                            <img src={imgGiga} alt="Imagem de Login" className="w-full h-full object-cover" />
                        </div>
    
                        <div className="w-full md:w-1/2 p-6">
                            <div className="flex justify-center mb-4">
                                <img src={Logo} alt="Logo" className="h-12" />
                            </div>
    
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
                                    onClick={() => {
                                        setActiveTab('register');
                                        setStep(1);
                                    }}
                                    className="flex-1 py-4 font-medium text-sm text-gray-500 hover:text-gray-700"
                                >
                                    Cadastro
                                </button>
                            </div>
    
                            <div className="mt-6">
                                <form onSubmit={handleLogin}>
                                    <label className="block text-sm font-medium text-gray-700 rounded-md mb-4">E-mail</label>
                                    <input 
                                        type="email" 
                                        name="loginEmail"
                                        value={formData.loginEmail}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md mb-1 text-gray-700" 
                                        placeholder="seu@email.com" 
                                    />
                                    {errors.loginEmail && <p className="text-red-500 text-xs mb-3">{errors.loginEmail}</p>}

                                    <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">Senha</label>
                                    <input 
                                        type="password"
                                        name="loginSenha"
                                        value={formData.loginSenha}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md mb-1 text-gray-700"
                                        placeholder="Digite sua senha"
                                    />
                                    {errors.loginSenha && <p className="text-red-500 text-xs mb-3">{errors.loginSenha}</p>}
                                    
                                    <button 
                                        type="submit" 
                                        className="w-full bg-blue-600 text-white py-2 rounded-md mt-6 hover:bg-blue-700 transition-colors"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Entrando...' : 'Entrar'}
                                    </button>
                                    
                                    {errors.submit && (
                                        <div className="mt-4 p-2 bg-red-100 text-red-700 rounded text-center">
                                            {errors.submit}
                                        </div>
                                    )}
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