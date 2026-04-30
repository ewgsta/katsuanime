"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Modal kapanırken görünümü sıfırla, ama animasyonun bitmesini bekle
      setTimeout(() => setIsLoginView(true), 300);
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    onClose();
  };

  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`} onClick={onClose}>
      <div
        className="modal-horizontal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
          style={{ zIndex: 10 }}
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="modal-auth-image">
          <div className="modal-auth-overlay-text">
            <h2>
              KatsuAnime'ye
              <br />
              Hoş Geldin!
            </h2>
            <p>KatsuAnime'ye katıl!</p>
          </div>
        </div>

        <div className="modal-form-section">
          <div className="auth-view-container">
            {/* LOGIN VIEW */}
            <div className={`auth-view ${isLoginView ? "active" : "outgoing"}`}>
              <h3 className="modal-title">Giriş Yap</h3>
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label className="form-label">E-posta</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="ornek@mail.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Şifre</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ marginBottom: "15px" }}
                >
                  Giriş Yap
                </button>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "13px",
                    color: "var(--text-muted)",
                  }}
                >
                  Hesabın yok mu?{" "}
                  <button
                    type="button"
                    onClick={() => setIsLoginView(false)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--text-main)",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontFamily: "inherit",
                    }}
                  >
                    Kayıt Ol
                  </button>
                </div>
              </form>
            </div>

            {/* REGISTER VIEW */}
            <div
              className={`auth-view ${!isLoginView ? "active" : "outgoing-right"}`}
            >
              <h3 className="modal-title">Kayıt Ol</h3>
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label className="form-label">Kullanıcı Adı</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Katsu"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">E-posta</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="ornek@mail.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Şifre</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ marginBottom: "15px" }}
                >
                  Kayıt Ol
                </button>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "13px",
                    color: "var(--text-muted)",
                  }}
                >
                  Zaten hesabın var mı?{" "}
                  <button
                    type="button"
                    onClick={() => setIsLoginView(true)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--text-main)",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontFamily: "inherit",
                    }}
                  >
                    Giriş Yap
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
