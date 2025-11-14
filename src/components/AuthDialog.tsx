import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: 'login' | 'register';
}

export default function AuthDialog({ open, onOpenChange, defaultTab = 'login' }: AuthDialogProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    agreeTerms: false,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.email || !loginData.password) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Успешный вход!',
      description: 'Добро пожаловать в Golden Casino',
    });
    onOpenChange(false);
    navigate('/profile');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!registerData.email || !registerData.password || !registerData.username) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все обязательные поля',
        variant: 'destructive',
      });
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: 'Ошибка',
        description: 'Пароли не совпадают',
        variant: 'destructive',
      });
      return;
    }

    if (registerData.password.length < 6) {
      toast({
        title: 'Ошибка',
        description: 'Пароль должен содержать минимум 6 символов',
        variant: 'destructive',
      });
      return;
    }

    if (!registerData.agreeTerms) {
      toast({
        title: 'Ошибка',
        description: 'Необходимо согласиться с правилами',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Регистрация успешна!',
      description: 'Добро пожаловать! Получите приветственный бонус 200%',
    });
    onOpenChange(false);
    navigate('/profile');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            GOLDEN CASINO
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'login' | 'register')} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Вход
            </TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Регистрация
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 mt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="example@email.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Пароль</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="bg-background"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox />
                  <span className="text-foreground/70">Запомнить меня</span>
                </label>
                <a href="#" className="text-primary hover:underline">
                  Забыли пароль?
                </a>
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold">
                <Icon name="LogIn" className="mr-2" size={18} />
                Войти
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-foreground/60">или войти через</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button type="button" variant="outline" className="w-full">
                  <Icon name="Mail" className="mr-2" size={18} />
                  Google
                </Button>
                <Button type="button" variant="outline" className="w-full">
                  <Icon name="Facebook" className="mr-2" size={18} />
                  Facebook
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="register" className="space-y-4 mt-6">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-username">Имя пользователя</Label>
                <Input
                  id="register-username"
                  type="text"
                  placeholder="Ваше имя"
                  value={registerData.username}
                  onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="example@email.com"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password">Пароль</Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="Минимум 6 символов"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-confirm">Подтвердите пароль</Label>
                <Input
                  id="register-confirm"
                  type="password"
                  placeholder="Повторите пароль"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  className="bg-background"
                />
              </div>

              <div className="flex items-start gap-3 p-4 bg-primary/10 rounded-lg border border-primary/30">
                <Icon name="Gift" size={24} className="text-primary flex-shrink-0 mt-1" />
                <div className="text-sm">
                  <p className="font-semibold text-primary mb-1">Приветственный бонус 200%</p>
                  <p className="text-foreground/70">При регистрации вы получите щедрый бонус на первый депозит</p>
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  checked={registerData.agreeTerms}
                  onCheckedChange={(checked) => setRegisterData({ ...registerData, agreeTerms: checked as boolean })}
                  className="mt-1"
                />
                <span className="text-sm text-foreground/70">
                  Я подтверждаю, что мне есть 18 лет, и принимаю{' '}
                  <a href="#" className="text-primary hover:underline">
                    правила и условия
                  </a>
                </span>
              </label>

              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold">
                <Icon name="UserPlus" className="mr-2" size={18} />
                Зарегистрироваться
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}