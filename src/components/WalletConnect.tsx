
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, ChevronDown, LogOut } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useToast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const WalletConnect = () => {
  const { publicKey, disconnect, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const { toast } = useToast();
  const [walletAddress, setWalletAddress] = useState('');
  const [hasShownToast, setHasShownToast] = useState(false);

  useEffect(() => {
    if (publicKey) {
      const address = publicKey.toString();
      // Format the address for display: first 4 and last 4 characters
      setWalletAddress(`${address.slice(0, 4)}...${address.slice(-4)}`);
      
      // Show toast only once when wallet is connected
      if (connected && !hasShownToast) {
        toast({
          title: "Wallet connected successfully",
          description: `Connected to ${address.slice(0, 4)}...${address.slice(-4)}`,
          variant: "default",
        });
        setHasShownToast(true);
      }
    } else {
      setWalletAddress('');
      setHasShownToast(false);
    }
  }, [publicKey, connected, toast, hasShownToast]);

  const handleConnectClick = () => {
    if (!connected) {
      setVisible(true);
    }
  };

  const handleDisconnect = () => {
    disconnect().then(() => {
      toast({
        title: "Wallet disconnected",
        description: "Your wallet has been disconnected successfully."
      });
    }).catch((error) => {
      console.error("Failed to disconnect wallet:", error);
      toast({
        title: "Error",
        description: "Failed to disconnect wallet.",
        variant: "destructive",
      });
    });
  };

  if (connected && publicKey) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="text-green-600 border-green-600"
          >
            <Wallet size={16} className="mr-2" />
            {walletAddress}
            <ChevronDown size={16} className="ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem 
            className="text-red-500 cursor-pointer flex items-center"
            onClick={handleDisconnect}
          >
            <LogOut size={16} className="mr-2" /> Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button 
      onClick={handleConnectClick}
      className="bg-agri-green hover:bg-agri-green/90"
    >
      <Wallet size={16} className="mr-2" />
      Connect Wallet
    </Button>
  );
};

export default WalletConnect;
