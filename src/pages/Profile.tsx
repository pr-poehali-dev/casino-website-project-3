import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Transaction {
  id: number;
  type: 'deposit' | 'withdraw' | 'win' | 'bet';
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

interface GameHistory {
  id: number;
  game: string;
  bet: number;
  win: number;
  date: string;
}

export default function Profile() {
  const { toast } = useToast();
  const [balance] = useState(15420.50);
  const [bonusBalance] = useState(3250.00);
  const [level] = useState(12);
  const [experience] = useState(67);

  const transactions: Transaction[] = [
    { id: 1, type: 'deposit', amount: 5000, date: '2024-11-14 14:30', status: 'completed' },
    { id: 2, type: 'win', amount: 12500, date: '2024-11-14 13:15', status: 'completed' },
    { id: 3, type: 'bet', amount: -500, date: '2024-11-14 12:45', status: 'completed' },
    { id: 4, type: 'withdraw', amount: -2000, date: '2024-11-13 18:20', status: 'pending' },
  ];

  const gameHistory: GameHistory[] = [
    { id: 1, game: 'Mega Fortune', bet: 500, win: 12500, date: '2024-11-14 13:15' },
    { id: 2, game: 'Book of Ra', bet: 200, win: 0, date: '2024-11-14 12:30' },
    { id: 3, game: 'Starburst', bet: 300, win: 450, date: '2024-11-13 20:10' },
    { id: 4, game: 'Live Blackjack', bet: 1000, win: 2100, date: '2024-11-13 19:45' },
  ];

  const bonuses = [
    { id: 1, title: 'Приветственный бонус', amount: 10000, status: 'active', expires: '2024-12-01' },
    { id: 2, title: 'Бесплатные вращения', amount: 50, status: 'active', expires: '2024-11-20' },
    { id: 3, title: 'Кэшбэк за неделю', amount: 1250, status: 'available', expires: '2024-11-17' },
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit': return 'ArrowDownToLine';
      case 'withdraw': return 'ArrowUpFromLine';
      case 'win': return 'TrendingUp';
      case 'bet': return 'Minus';
      default: return 'DollarSign';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'deposit': return 'text-primary';
      case 'withdraw': return 'text-accent';
      case 'win': return 'text-green-500';
      case 'bet': return 'text-foreground/60';
      default: return 'text-foreground';
    }
  };

  const handleWithdraw = () => {
    toast({
      title: 'Заявка на вывод создана',
      description: 'Средства будут зачислены в течение 24 часов',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Icon name="Sparkles" size={24} className="text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                GOLDEN CASINO
              </h1>
            </div>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              <Icon name="Home" className="mr-2" size={18} />
              На главную
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-gradient-to-br from-card to-card/50 border-primary/30">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-24 h-24 mb-4 border-4 border-primary/30">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-2xl font-bold">
                      ИП
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold mb-1">Игрок#12345</h2>
                  <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
                    <Icon name="Star" size={12} className="mr-1" />
                    Уровень {level}
                  </Badge>
                  
                  <div className="w-full mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground/70">Опыт</span>
                      <span className="text-primary font-semibold">{experience}%</span>
                    </div>
                    <Progress value={experience} className="h-2" />
                  </div>
                  <p className="text-xs text-foreground/60">До уровня {level + 1}: {100 - experience}%</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Wallet" size={20} className="text-primary" />
                  Баланс
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
                  <p className="text-sm text-foreground/70 mb-1">Основной счет</p>
                  <p className="text-3xl font-bold text-primary">{balance.toLocaleString('ru-RU')} ₽</p>
                </div>

                <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/30">
                  <p className="text-sm text-foreground/70 mb-1">Бонусный счет</p>
                  <p className="text-2xl font-bold text-secondary">{bonusBalance.toLocaleString('ru-RU')} ₽</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button className="w-full bg-gradient-to-r from-primary to-accent">
                    <Icon name="Plus" className="mr-2" size={18} />
                    Пополнить
                  </Button>
                  <Button variant="outline" onClick={handleWithdraw}>
                    <Icon name="ArrowUpFromLine" className="mr-2" size={18} />
                    Вывести
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Icon name="LayoutDashboard" className="mr-2" size={16} />
                  Обзор
                </TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Icon name="History" className="mr-2" size={16} />
                  История
                </TabsTrigger>
                <TabsTrigger value="bonuses" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Icon name="Gift" className="mr-2" size={16} />
                  Бонусы
                </TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Icon name="Settings" className="mr-2" size={16} />
                  Настройки
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="TrendingUp" size={20} className="text-primary" />
                      Статистика игрока
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="p-4 bg-card rounded-lg border border-border">
                        <p className="text-sm text-foreground/70 mb-1">Всего ставок</p>
                        <p className="text-2xl font-bold">1,248</p>
                      </div>
                      <div className="p-4 bg-card rounded-lg border border-border">
                        <p className="text-sm text-foreground/70 mb-1">Побед</p>
                        <p className="text-2xl font-bold text-green-500">487</p>
                      </div>
                      <div className="p-4 bg-card rounded-lg border border-border">
                        <p className="text-sm text-foreground/70 mb-1">Винрейт</p>
                        <p className="text-2xl font-bold text-primary">39%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Receipt" size={20} className="text-primary" />
                      Последние транзакции
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {transactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              transaction.type === 'win' ? 'bg-green-500/20' :
                              transaction.type === 'deposit' ? 'bg-primary/20' :
                              transaction.type === 'withdraw' ? 'bg-accent/20' :
                              'bg-muted'
                            }`}>
                              <Icon name={getTransactionIcon(transaction.type)} size={20} className={getTransactionColor(transaction.type)} />
                            </div>
                            <div>
                              <p className="font-semibold capitalize">
                                {transaction.type === 'deposit' ? 'Пополнение' :
                                 transaction.type === 'withdraw' ? 'Вывод' :
                                 transaction.type === 'win' ? 'Выигрыш' : 'Ставка'}
                              </p>
                              <p className="text-sm text-foreground/60">{transaction.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-bold ${transaction.amount > 0 ? 'text-green-500' : 'text-foreground'}`}>
                              {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString('ru-RU')} ₽
                            </p>
                            <Badge variant={transaction.status === 'completed' ? 'default' : transaction.status === 'pending' ? 'secondary' : 'destructive'} className="text-xs">
                              {transaction.status === 'completed' ? 'Завершено' : transaction.status === 'pending' ? 'В обработке' : 'Отклонено'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Gamepad2" size={20} className="text-primary" />
                      История игр
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {gameHistory.map((game) => (
                        <div key={game.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                          <div>
                            <p className="font-semibold">{game.game}</p>
                            <p className="text-sm text-foreground/60">{game.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-foreground/70">Ставка: {game.bet} ₽</p>
                            <p className={`font-bold ${game.win > game.bet ? 'text-green-500' : game.win === 0 ? 'text-foreground/60' : 'text-primary'}`}>
                              Выигрыш: {game.win} ₽
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bonuses" className="space-y-4">
                {bonuses.map((bonus) => (
                  <Card key={bonus.id} className="bg-gradient-to-br from-card to-card/50 border-primary/30">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon name="Gift" size={28} className="text-primary" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg mb-1">{bonus.title}</h3>
                            <p className="text-2xl font-bold text-primary mb-2">
                              {bonus.amount.toLocaleString('ru-RU')} {typeof bonus.amount === 'number' && bonus.amount < 1000 ? 'FS' : '₽'}
                            </p>
                            <p className="text-sm text-foreground/60">Действует до: {bonus.expires}</p>
                          </div>
                        </div>
                        <Badge variant={bonus.status === 'active' ? 'default' : 'secondary'}>
                          {bonus.status === 'active' ? 'Активен' : 'Доступен'}
                        </Badge>
                      </div>
                      {bonus.status === 'available' && (
                        <Button className="w-full mt-4 bg-gradient-to-r from-primary to-accent">
                          Активировать бонус
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="User" size={20} className="text-primary" />
                      Личные данные
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Имя пользователя</Label>
                        <Input id="username" defaultValue="Игрок#12345" className="bg-background" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="player@example.com" className="bg-background" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" className="bg-background" />
                    </div>
                    <Button className="bg-gradient-to-r from-primary to-accent">
                      Сохранить изменения
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Lock" size={20} className="text-primary" />
                      Безопасность
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Текущий пароль</Label>
                      <Input id="current-password" type="password" className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Новый пароль</Label>
                      <Input id="new-password" type="password" className="bg-background" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Подтвердите пароль</Label>
                      <Input id="confirm-password" type="password" className="bg-background" />
                    </div>
                    <Button variant="outline">
                      Изменить пароль
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
