import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    placa: "",
    tipo: "",
    local: "",
    data: "",
    descricao: "",
    valor: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simula envio para API
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Evento registrado com sucesso!",
        description: "O evento foi registrado e está sendo processado na blockchain.",
      });

      // Redireciona para o dashboard
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Erro ao registrar evento",
        description: "Ocorreu um erro. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.placa && formData.tipo && formData.local && formData.data;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/dashboard")}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Registrar Novo Evento
              </h1>
              <p className="text-muted-foreground">Adicione um novo evento ao sistema</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Informações do Evento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Placa */}
                <div className="space-y-2">
                  <Label htmlFor="placa">Placa do Veículo *</Label>
                  <Input
                    id="placa"
                    placeholder="Ex: ABC-1234"
                    value={formData.placa}
                    onChange={(e) => handleInputChange("placa", e.target.value.toUpperCase())}
                    className="font-mono"
                    maxLength={8}
                    required
                  />
                </div>

                {/* Tipo */}
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de Evento *</Label>
                  <Select value={formData.tipo} onValueChange={(value) => handleInputChange("tipo", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de evento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="multa">Multa</SelectItem>
                      <SelectItem value="licenciamento">Licenciamento</SelectItem>
                      <SelectItem value="vistoria">Vistoria</SelectItem>
                      <SelectItem value="transferencia">Transferência</SelectItem>
                      <SelectItem value="seguro">Seguro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Data e Local - Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="data">Data do Evento *</Label>
                    <Input
                      id="data"
                      type="date"
                      value={formData.data}
                      onChange={(e) => handleInputChange("data", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="valor">Valor (opcional)</Label>
                    <Input
                      id="valor"
                      type="number"
                      placeholder="R$ 0,00"
                      value={formData.valor}
                      onChange={(e) => handleInputChange("valor", e.target.value)}
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>

                {/* Local */}
                <div className="space-y-2">
                  <Label htmlFor="local">Local *</Label>
                  <Input
                    id="local"
                    placeholder="Ex: São Paulo - SP"
                    value={formData.local}
                    onChange={(e) => handleInputChange("local", e.target.value)}
                    required
                  />
                </div>

                {/* Descrição */}
                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição (opcional)</Label>
                  <Textarea
                    id="descricao"
                    placeholder="Detalhes adicionais sobre o evento..."
                    value={formData.descricao}
                    onChange={(e) => handleInputChange("descricao", e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Informação sobre Blockchain */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium text-primary mb-1">Verificação Blockchain</h3>
                      <p className="text-sm text-muted-foreground">
                        Após o registro, o evento será processado e seu hash será verificado na blockchain para garantir autenticidade e imutabilidade dos dados.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Botões */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/dashboard")}
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Registrando...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Registrar Evento
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;