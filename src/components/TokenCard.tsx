
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';

interface TokenCardProps {
  name: string;
  symbol: string;
  icon: string;
  description: string;
  price: number;
}

const TokenCard = ({ name, symbol, icon, description, price }: TokenCardProps) => {
  const [amount, setAmount] = useState(1);
  const { toast } = useToast();

  const incrementAmount = () => setAmount(prev => prev + 1);
  const decrementAmount = () => setAmount(prev => prev > 1 ? prev - 1 : 1);

  const handleMint = () => {
    toast({
      title: `Minting ${amount} ${symbol} tokens`,
      description: "Your transaction is being processed...",
    });
    
    // Simulate transaction completion
    setTimeout(() => {
      toast({
        title: "Minting successful!",
        description: `${amount} ${symbol} tokens have been added to your wallet.`,
      });
    }, 2000);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg card-hover-effect">
      <div className="h-3 agri-gradient"></div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <img src={icon} alt={name} className="w-10 h-10 rounded-full" />
            <div>
              <CardTitle className="text-xl text-agri-brown">{name}</CardTitle>
              <CardDescription>{symbol}</CardDescription>
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                  ${price.toFixed(2)}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Current market price</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
          <Button
            variant="outline"
            size="icon"
            onClick={decrementAmount}
            className="h-8 w-8"
          >
            -
          </Button>
          <span className="font-medium text-lg">{amount}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={incrementAmount}
            className="h-8 w-8"
          >
            +
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-agri-green hover:bg-agri-green/90 btn-hover-effect" 
          onClick={handleMint}
        >
          Mint {amount} {symbol}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TokenCard;
