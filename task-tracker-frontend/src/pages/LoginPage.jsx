import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../features/auth/services/authService';
import Button from '../components/ui/Button';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/ui/Input';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await login(email, password);
        alert("Ви увійшли!");
    } catch (err) {
        console.error(err);
    }
  };

  return (
    <AuthLayout title="Вітаємо у Worksection" subtitle="Увійдіть у свій акаунт">
      <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email"
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Пароль"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" className="w-full py-3">Увійти</Button>
        </form>

      <p className="text-center text-sm text-text-muted mt-6">
        Немає акаунту?{' '}
        <Link to="/register" className="text-accent font-semibold hover:underline">
          Зареєструватися
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;