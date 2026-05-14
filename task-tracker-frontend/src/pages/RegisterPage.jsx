import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Реєстрація:', formData);
    // Тут буде логіка відправки на твій Java Backend (Spring Boot)
  };

  return (
    <AuthLayout
      title="Створити акаунт"
      subtitle="Приєднуйтесь до Task Tracker by DMYK"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Ім'я користувача"
          placeholder="Введіть ваш нікнейм"
          value={formData.username}
          onChange={(e) => setFormData({...formData, username: e.target.value})}
          required
        />
        <Input
          label="Email"
          type="email"
          placeholder="example@gmail.com"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        <Input
          label="Пароль"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
        <Input
          label="Підтвердіть пароль"
          type="password"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          required
        />

        <Button type="submit" className="w-full py-3 mt-4">
          Зареєструватися
        </Button>

        <p className="text-center text-sm text-text-muted mt-6">
          Вже маєте акаунт?{' '}
          <Link to="/login" className="text-accent font-semibold hover:underline">
            Увійти
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;