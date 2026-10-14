import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

function SignIn() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080B14] px-4 py-10 text-white">
            <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
            <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

            <div className="relative w-full max-w-md">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-blue-600 shadow-lg shadow-violet-500/25">
                        <Lock size={26} />
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight">
                        Bem-vindo de volta
                    </h1>

                    <p className="mt-3 text-sm text-gray-400">
                        Entre na sua conta para continuar.
                    </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                    <form
                        className="space-y-5"
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-gray-200"
                            >
                                E-mail
                            </label>

                            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0D111D] px-4 transition focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/20">
                                <Mail size={18} className="shrink-0 text-gray-500" />

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="seu@email.com"
                                    autoComplete="email"
                                    required
                                    className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-gray-600"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="text-sm font-medium text-gray-200"
                                >
                                    Senha
                                </label>

                                <a
                                    href="/forgot-password"
                                    className="text-xs text-violet-400 transition hover:text-violet-300"
                                >
                                    Esqueceu a senha?
                                </a>
                            </div>

                            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0D111D] px-4 transition focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/20">
                                <Lock size={18} className="shrink-0 text-gray-500" />

                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Digite sua senha"
                                    autoComplete="current-password"
                                    required
                                    className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-gray-600"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                    className="text-gray-500 transition hover:text-white"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="cursor-pointer group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 py-3.5 text-sm font-semibold shadow-lg shadow-violet-600/20 transition hover:scale-[1.01] hover:from-violet-500 hover:to-blue-500 active:scale-[0.98]"
                        >
                            Entrar na conta
                            <ArrowRight
                                size={18}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </button>
                    </form>

                    <div className="my-6 flex items-center gap-4">
                        <div className="h-px flex-1 bg-white/10" />
                        <span className="text-xs text-gray-500">OU</span>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    <p className="text-center text-sm text-gray-400">
                        Ainda não tem uma conta?{" "}
                        <a
                            href="/signup"
                            className="font-semibold text-violet-400 transition hover:text-violet-300"
                        >
                            Criar conta
                        </a>
                    </p>
                </div>

                <p className="mt-6 text-center text-xs text-gray-600">
                    © 2026 · Todos os direitos reservados.
                </p>
            </div>
        </div>
    );
}

export { SignIn };