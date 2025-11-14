import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toaster } from '@/components/ui/toaster';
import Icon from '@/components/ui/icon';
import AuthDialog from '@/components/AuthDialog';

interface Game {
  id: number;
  title: string;
  category: string;
  image: string;
  provider: string;
  popular: boolean;
  new: boolean;
}

const games: Game[] = [
  { id: 1, title: 'Mega Fortune', category: 'slots', image: 'https://cdn.poehali.dev/projects/22592d1c-ae1f-48fa-a4c6-ba7dc247ec0f/files/2d5fec6d-3490-4416-b43c-36c30d0c2186.jpg', provider: 'NetEnt', popular: true, new: false },
  { id: 2, title: 'European Roulette', category: 'roulette', image: 'https://cdn.poehali.dev/projects/22592d1c-ae1f-48fa-a4c6-ba7dc247ec0f/files/939febd7-917e-474f-b064-9a858846e084.jpg', provider: 'Evolution', popular: true, new: false },
  { id: 3, title: 'Texas Hold\'em', category: 'cards', image: 'https://cdn.poehali.dev/projects/22592d1c-ae1f-48fa-a4c6-ba7dc247ec0f/files/5c7d9963-3617-4779-91b5-d5b62d19cff8.jpg', provider: 'Microgaming', popular: false, new: true },
  { id: 4, title: 'Book of Ra', category: 'slots', image: 'https://cdn.poehali.dev/projects/22592d1c-ae1f-48fa-a4c6-ba7dc247ec0f/files/2d5fec6d-3490-4416-b43c-36c30d0c2186.jpg', provider: 'Novomatic', popular: true, new: false },
  { id: 5, title: 'Live Blackjack', category: 'live', image: 'https://cdn.poehali.dev/projects/22592d1c-ae1f-48fa-a4c6-ba7dc247ec0f/files/5c7d9963-3617-4779-91b5-d5b62d19cff8.jpg', provider: 'Evolution', popular: true, new: true },
  { id: 6, title: 'Starburst', category: 'slots', image: 'https://cdn.poehali.dev/projects/22592d1c-ae1f-48fa-a4c6-ba7dc247ec0f/files/2d5fec6d-3490-4416-b43c-36c30d0c2186.jpg', provider: 'NetEnt', popular: false, new: false },
];

export default function Index() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [demoGame, setDemoGame] = useState<number | null>(null);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogTab, setAuthDialogTab] = useState<'login' | 'register'>('login');

  const filteredGames = activeCategory === 'all' 
    ? games 
    : games.filter(game => game.category === activeCategory);

  return (
    <div className="min-h-screen">
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
            <nav className="hidden md:flex items-center gap-6">
              <a href="#games" className="text-foreground/80 hover:text-primary transition-colors">Игры</a>
              <a href="#bonuses" className="text-foreground/80 hover:text-primary transition-colors">Бонусы</a>
              <a href="#rules" className="text-foreground/80 hover:text-primary transition-colors">Правила</a>
              <a href="#payment" className="text-foreground/80 hover:text-primary transition-colors">Пополнение</a>
            </nav>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                className="hidden sm:flex"
                onClick={() => {
                  setAuthDialogTab('login');
                  setAuthDialogOpen(true);
                }}
              >
                Войти
              </Button>
              <Button 
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold"
                onClick={() => {
                  setAuthDialogTab('register');
                  setAuthDialogOpen(true);
                }}
              >
                Регистрация
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              Добро пожаловать в мир{' '}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                премиум казино
              </span>
            </h2>
            <p className="text-xl text-foreground/70 mb-8">
              Лучшие игровые автоматы, щедрые бонусы и мгновенные выплаты
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold text-lg px-8">
                <Icon name="Gift" className="mr-2" size={20} />
                Получить бонус
              </Button>
              <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10">
                <Icon name="Play" className="mr-2" size={20} />
                Играть демо
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="bonuses" className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Эксклюзивные бонусы</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-card to-card/50 border-primary/30 hover:border-primary/60 transition-all hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Gift" size={32} className="text-primary" />
                </div>
                <h4 className="text-2xl font-bold mb-2">200%</h4>
                <p className="text-foreground/70 mb-4">Бонус на первый депозит</p>
                <Button className="w-full bg-gradient-to-r from-primary to-accent">
                  Получить
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-card/50 border-secondary/30 hover:border-secondary/60 transition-all hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Zap" size={32} className="text-secondary" />
                </div>
                <h4 className="text-2xl font-bold mb-2">100 FS</h4>
                <p className="text-foreground/70 mb-4">Бесплатные вращения</p>
                <Button className="w-full bg-gradient-to-r from-secondary to-primary">
                  Забрать
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-card/50 border-accent/30 hover:border-accent/60 transition-all hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="TrendingUp" size={32} className="text-accent" />
                </div>
                <h4 className="text-2xl font-bold mb-2">15%</h4>
                <p className="text-foreground/70 mb-4">Кэшбэк каждую неделю</p>
                <Button className="w-full bg-gradient-to-r from-accent to-secondary">
                  Активировать
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="games" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Каталог игр</h3>
          
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 mb-12">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Icon name="LayoutGrid" className="mr-2" size={16} />
                Все
              </TabsTrigger>
              <TabsTrigger value="slots" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Icon name="Cherry" className="mr-2" size={16} />
                Слоты
              </TabsTrigger>
              <TabsTrigger value="roulette" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Icon name="Target" className="mr-2" size={16} />
                Рулетка
              </TabsTrigger>
              <TabsTrigger value="cards" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Icon name="Spade" className="mr-2" size={16} />
                Карты
              </TabsTrigger>
              <TabsTrigger value="live" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Icon name="Video" className="mr-2" size={16} />
                Live
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeCategory} className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGames.map((game) => (
                  <Card key={game.id} className="group overflow-hidden bg-card/80 hover:bg-card transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
                    <div className="relative aspect-square overflow-hidden">
                      <img 
                        src={game.image} 
                        alt={game.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                      <div className="absolute top-2 right-2 flex gap-2">
                        {game.popular && (
                          <Badge className="bg-accent text-white">
                            <Icon name="Flame" size={12} className="mr-1" />
                            Популярно
                          </Badge>
                        )}
                        {game.new && (
                          <Badge className="bg-secondary text-white">
                            <Icon name="Sparkles" size={12} className="mr-1" />
                            Новинка
                          </Badge>
                        )}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <div className="flex gap-2 w-full">
                          <Button 
                            className="flex-1 bg-primary hover:bg-primary/90"
                            onClick={() => setDemoGame(game.id)}
                          >
                            <Icon name="Play" className="mr-2" size={16} />
                            Демо
                          </Button>
                          <Button className="flex-1 bg-gradient-to-r from-accent to-secondary">
                            <Icon name="Wallet" className="mr-2" size={16} />
                            Играть
                          </Button>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-bold text-lg mb-1">{game.title}</h4>
                      <p className="text-sm text-foreground/60">{game.provider}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="rules" className="py-16 bg-card/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h3 className="text-3xl font-bold text-center mb-12">Правила игры</h3>
          <div className="space-y-4">
            <Card className="bg-card/80">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="UserCheck" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Возрастное ограничение</h4>
                    <p className="text-foreground/70">Играть могут только совершеннолетние пользователи (18+)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Shield" size={24} className="text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Безопасность</h4>
                    <p className="text-foreground/70">Все транзакции защищены SSL-шифрованием</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Clock" size={24} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Выплаты</h4>
                    <p className="text-foreground/70">Вывод средств обрабатывается в течение 24 часов</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="payment" className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h3 className="text-3xl font-bold text-center mb-12">Пополнение и вывод</h3>
          <Card className="bg-gradient-to-br from-card to-card/50 border-primary/30">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Icon name="ArrowDownToLine" size={24} className="text-primary" />
                    Пополнение счета
                  </h4>
                  <div className="space-y-3 text-foreground/70">
                    <p>• Банковские карты (Visa, Mastercard)</p>
                    <p>• Электронные кошельки</p>
                    <p>• Криптовалюта (BTC, ETH, USDT)</p>
                    <p>• Минимальный депозит: 500₽</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Icon name="ArrowUpFromLine" size={24} className="text-accent" />
                    Вывод средств
                  </h4>
                  <div className="space-y-3 text-foreground/70">
                    <p>• Быстрый вывод до 24 часов</p>
                    <p>• Без комиссии казино</p>
                    <p>• Верификация аккаунта</p>
                    <p>• Минимальный вывод: 1000₽</p>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-6 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold text-lg">
                <Icon name="Wallet" className="mr-2" size={20} />
                Пополнить счет
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t border-border/40 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-foreground/60">
          <p className="mb-2">© 2024 Golden Casino. Все права защищены.</p>
          <p className="text-sm">Азартные игры могут вызывать зависимость. Играйте ответственно. 18+</p>
        </div>
      </footer>

      {demoGame && (
        <div 
          className="fixed inset-0 bg-background/95 z-50 flex items-center justify-center p-4"
          onClick={() => setDemoGame(null)}
        >
          <Card className="max-w-2xl w-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Демо режим</h3>
                <Button variant="ghost" size="icon" onClick={() => setDemoGame(null)}>
                  <Icon name="X" size={24} />
                </Button>
              </div>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Icon name="Gamepad2" size={64} className="mx-auto text-primary" />
                  <p className="text-lg">Демо-версия игры запускается...</p>
                  <Button className="bg-gradient-to-r from-primary to-accent">
                    Начать игру
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <AuthDialog 
        open={authDialogOpen} 
        onOpenChange={setAuthDialogOpen}
        defaultTab={authDialogTab}
      />
      <Toaster />
    </div>
  );
}