import { useState } from 'react';
import Logo from '../images/logo.png';

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

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-md w-full max-w-md overflow-hidden">
                {/* Imagem logo */}
                <div className="flex justify-center mt-4 mb-4">
                    <img src={Logo} alt="Logo" className="h-12" />
                </div>
    
                {/* Abas */}
                <div className="flex border-b">
                    <button
                        type="button"
                        onClick={() => setActiveTab('login')}
                        className={`flex-1 py-4 font-medium text-sm ${activeTab === 'login' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('register')}
                        className={`flex-1 py-4 font-medium text-sm ${activeTab === 'register' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Cadastro
                    </button>
                </div>

                <div className="p-6">
                    {successMessage && (
                        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-center">
                            {successMessage}
                        </div>
                    )}

                    {/* Formulário de Login */}
                    {activeTab === 'login' && (
                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-700 mb-1">
                                    E-mail
                                </label>
                                <input
                                    type="email"
                                    id="loginEmail"
                                    name="loginEmail"
                                    value={formData.loginEmail}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border ${errors.loginEmail ? 'border-red-500' : 'border-gray-300'} bg-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="seu@email.com"
                                />
                                {errors.loginEmail && <p className="mt-1 text-sm text-red-600">{errors.loginEmail}</p>}
                            </div>

                            <div className="mb-6">
                                <label htmlFor="loginSenha" className="block text-sm font-medium text-gray-700 mb-1">
                                    Senha
                                </label>
                                <input
                                    type="password"
                                    id="loginSenha"
                                    name="loginSenha"
                                    value={formData.loginSenha}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border ${errors.loginSenha ? 'border-red-500' : 'border-gray-300'} bg-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Digite sua senha"
                                />
                                {errors.loginSenha && <p className="mt-1 text-sm text-red-600">{errors.loginSenha}</p>}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
                            >
                                Entrar
                            </button>
                        </form>
                    )}

                    {/* Formulário de Cadastro */}
                    {activeTab === 'register' && (
                        <form onSubmit={handleRegister}>
                            <div className="mb-4">
                                <label htmlFor="nomeCompleto" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nome Completo
                                </label>
                                <input
                                    type="text"
                                    id="nomeCompleto"
                                    name="nomeCompleto"
                                    value={formData.nomeCompleto}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border ${errors.nomeCompleto ? 'border-red-500' : 'border-gray-300'} bg-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Seu nome completo"
                                />
                                {errors.nomeCompleto && <p className="mt-1 text-sm text-red-600">{errors.nomeCompleto}</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    E-mail
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} bg-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="seu@email.com"
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">
                                    CPF
                                </label>
                                <input
                                    type="text"
                                    id="cpf"
                                    name="cpf"
                                    value={formatCpf(formData.cpf)}
                                    onChange={(e) => {
                                        const rawValue = e.target.value.replace(/\D/g, '');
                                        if (rawValue.length <= 11) {
                                            handleChange({
                                                target: {
                                                    name: 'cpf',
                                                    value: e.target.value
                                                }
                                            });
                                        }
                                    }}
                                    className={`w-full px-4 py-2 border ${errors.cpf ? 'border-red-500' : 'border-gray-300'} bg-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="000.000.000-00"
                                />
                                {errors.cpf && <p className="mt-1 text-sm text-red-600">{errors.cpf}</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                                    Telefone
                                </label>
                                <input
                                    type="text"
                                    id="telefone"
                                    name="telefone"
                                    value={formatPhone(formData.telefone)}
                                    onChange={(e) => {
                                        const rawValue = e.target.value.replace(/\D/g, '');
                                        if (rawValue.length <= 11) {
                                            handleChange({
                                                target: {
                                                    name: 'telefone',
                                                    value: e.target.value
                                                }
                                            });
                                        }
                                    }}
                                    className={`w-full px-4 py-2 border ${errors.telefone ? 'border-red-500' : 'border-gray-300'} bg-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="(00) 00000-0000"
                                />
                                {errors.telefone && <p className="mt-1 text-sm text-red-600">{errors.telefone}</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="endereco" className="block text-sm font-medium text-gray-700 mb-1">
                                    Endereço Completo
                                </label>
                                <input
                                    type="text"
                                    id="endereco"
                                    name="endereco"
                                    value={formData.endereco}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border ${errors.endereco ? 'border-red-500' : 'border-gray-300'} bg-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Rua, número, bairro, cidade"
                                />
                                {errors.endereco && <p className="mt-1 text-sm text-red-600">{errors.endereco}</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-1">
                                    Senha
                                </label>
                                <input
                                    type="password"
                                    id="senha"
                                    name="senha"
                                    value={formData.senha}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border ${errors.senha ? 'border-red-500' : 'border-gray-300'} bg-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Mínimo 6 caracteres"
                                />
                                {errors.senha && <p className="mt-1 text-sm text-red-600">{errors.senha}</p>}
                            </div>

                            <div className="mb-6">
                                <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirmar Senha
                                </label>
                                <input
                                    type="password"
                                    id="confirmarSenha"
                                    name="confirmarSenha"
                                    value={formData.confirmarSenha}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border ${errors.confirmarSenha ? 'border-red-500' : 'border-gray-300'} bg-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    placeholder="Digite a senha novamente"
                                />
                                {errors.confirmarSenha && <p className="mt-1 text-sm text-red-600">{errors.confirmarSenha}</p>}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition duration-200"
                            >
                                Cadastrar
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );

}

export default Login;