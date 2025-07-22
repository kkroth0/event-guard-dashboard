import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, MapPin, Shield, Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Event {
  id: string;
  placa: string;
  data: string;
  tipo: string;
  local: string;
  hashVerificado: boolean;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [filterType, setFilterType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string>("");

  // Mock data - em produção viria do endpoint /events
  const mockEvents: Event[] = [
    {
      id: "1",
      placa: "ABC-1234",
      data: "2024-01-22",
      tipo: "Multa",
      local: "São Paulo - SP",
      hashVerificado: true
    },
    {
      id: "2",
      placa: "XYZ-5678",
      data: "2024-01-21",
      tipo: "Licenciamento",
      local: "Rio de Janeiro - RJ",
      hashVerificado: true
    },
    {
      id: "3",
      placa: "DEF-9012",
      data: "2024-01-20",
      tipo: "Vistoria",
      local: "Belo Horizonte - MG",
      hashVerificado: false
    }
  ];

  useEffect(() => {
    // Simula chamada da API
    setEvents(mockEvents);
    setFilteredEvents(mockEvents);
  }, []);

  useEffect(() => {
    let filtered = events;

    // Filtro por tipo
    if (filterType !== "all") {
      filtered = filtered.filter(event => event.tipo.toLowerCase() === filterType.toLowerCase());
    }

    // Filtro por placa/local
    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.local.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por data
    if (dateFilter) {
      filtered = filtered.filter(event => event.data === dateFilter);
    }

    setFilteredEvents(filtered);
  }, [events, filterType, searchTerm, dateFilter]);

  const getTypeColor = (tipo: string) => {
    switch (tipo.toLowerCase()) {
      case "multa":
        return "destructive";
      case "licenciamento":
        return "default";
      case "vistoria":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Dashboard de Eventos
              </h1>
              <p className="text-muted-foreground">Gerencie eventos de veículos com verificação blockchain</p>
            </div>
            <Button 
              onClick={() => navigate("/register")}
              className="bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Evento
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Filtros */}
        <Card className="mb-8 shadow-sm border-0 bg-gradient-to-r from-card to-card/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Buscar</label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    placeholder="Placa ou local..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo</label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="multa">Multa</SelectItem>
                    <SelectItem value="licenciamento">Licenciamento</SelectItem>
                    <SelectItem value="vistoria">Vistoria</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Data</label>
                <Input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Resultados</label>
                <div className="flex items-center h-10 px-3 bg-muted rounded-md">
                  <span className="text-sm text-muted-foreground">
                    {filteredEvents.length} evento(s)
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Eventos */}
        <div className="grid gap-4">
          {filteredEvents.map((event) => (
            <Card 
              key={event.id} 
              className="hover:shadow-md transition-all duration-200 border-0 bg-gradient-to-r from-card to-card/90"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
                    {/* Placa */}
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Placa</p>
                      <p className="font-mono text-lg font-bold">{event.placa}</p>
                    </div>

                    {/* Data */}
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Data</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <p className="font-medium">
                          {new Date(event.data).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>

                    {/* Tipo */}
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Tipo</p>
                      <Badge variant={getTypeColor(event.tipo)}>
                        {event.tipo}
                      </Badge>
                    </div>

                    {/* Local */}
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Local</p>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <p className="font-medium">{event.local}</p>
                      </div>
                    </div>
                  </div>

                  {/* Verificação Blockchain */}
                  <div className="ml-6">
                    {event.hashVerificado ? (
                      <div className="flex items-center gap-2 px-3 py-2 bg-success/10 text-success rounded-lg border border-success/20">
                        <Shield className="w-4 h-4" />
                        <span className="text-sm font-medium">✅ Hash verificado na blockchain</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 px-3 py-2 bg-warning/10 text-warning rounded-lg border border-warning/20">
                        <Shield className="w-4 h-4" />
                        <span className="text-sm font-medium">⏳ Verificação pendente</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredEvents.length === 0 && (
            <Card className="border-0 bg-gradient-to-r from-card to-card/80">
              <CardContent className="p-12 text-center">
                <div className="text-muted-foreground">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">Nenhum evento encontrado</p>
                  <p>Tente ajustar os filtros ou registrar um novo evento</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;