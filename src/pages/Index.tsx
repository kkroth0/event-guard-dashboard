import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Shield, Database, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Verificação Blockchain
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
            Sistema de Eventos Veiculares
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Gerencie eventos de veículos com verificação blockchain para garantir autenticidade e imutabilidade dos dados.
          </p>
          <Button 
            onClick={() => navigate("/dashboard")}
            size="lg"
            className="bg-gradient-to-r from-primary to-primary/80 hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            Acessar Dashboard
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/80 hover:shadow-xl transition-all duration-200">
            <CardHeader>
              <Database className="w-10 h-10 text-primary mb-4" />
              <CardTitle>Gestão de Eventos</CardTitle>
              <CardDescription>
                Registre e gerencie eventos de veículos de forma organizada e segura.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/80 hover:shadow-xl transition-all duration-200">
            <CardHeader>
              <Shield className="w-10 h-10 text-primary mb-4" />
              <CardTitle>Verificação Blockchain</CardTitle>
              <CardDescription>
                Todos os eventos são verificados na blockchain para garantir autenticidade.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/80 hover:shadow-xl transition-all duration-200">
            <CardHeader>
              <BarChart3 className="w-10 h-10 text-primary mb-4" />
              <CardTitle>Filtros Avançados</CardTitle>
              <CardDescription>
                Filtre eventos por tipo, data, placa ou local para encontrar informações rapidamente.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Acesse o dashboard e comece a gerenciar seus eventos de veículos.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => navigate("/dashboard")}
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/80"
              >
                Ver Eventos
              </Button>
              <Button 
                onClick={() => navigate("/register")}
                variant="outline"
                size="lg"
              >
                Registrar Evento
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
