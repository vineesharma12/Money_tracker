import { useState } from "react";
import { api, setStoredAuth } from "../api";

export function LoginPage({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = event => setForm(current => ({ ...current, [event.target.name]: event.target.value }));

  const submit = async event => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const auth = mode === "login" ? await api.login(form) : await api.register(form);
      setStoredAuth(auth);
      onLogin(auth);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  return <main className="auth-page">
    <form className="auth-card" onSubmit={submit}>
      <div className="brand auth-brand"><span className="brand-mark">K</span><span>Khata<span>Flow</span></span></div>
      <p className="eyebrow">User login</p>
      <h1>{mode === "login" ? "Welcome back" : "Create your account"}</h1>
      <p className="auth-copy">Login ke baad har user ka transactions, budgets aur udhar data alag manage hoga.</p>
      {mode === "register" && <label>Name<input name="name" value={form.name} onChange={update} placeholder="Your name" required /></label>}
      <label>Email<input type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com" required /></label>
      <label>Password<input type="password" name="password" value={form.password} onChange={update} placeholder="Minimum 6 characters" required minLength="6" /></label>
      {error && <div className="auth-error">{error}</div>}
      <button className="primary-button" disabled={loading}>{loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}</button>
      <button type="button" className="text-button auth-switch" onClick={() => setMode(mode === "login" ? "register" : "login")}>
        {mode === "login" ? "New user? Create account" : "Already registered? Login"}
      </button>
    </form>
  </main>;
}
