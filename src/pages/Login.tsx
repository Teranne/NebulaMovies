
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await googleSignIn();
      navigate('/');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-nebula-black flex flex-col">
      <div className="nebula-container py-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full nebula-gradient flex items-center justify-center nebula-logo-glow">
            <span className="text-white text-lg font-bold">N</span>
          </div>
          <span className="nebula-text-gradient text-xl font-bold tracking-tight">
            NebulaMovies
          </span>
        </Link>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="auth-form">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2 nebula-text-gradient">Welcome Back</h1>
            <p className="text-white/60">Sign in to continue to NebulaMovies</p>
          </div>
          
          {error && (
            <div className="bg-nebula-error/10 border border-nebula-error/20 text-nebula-error rounded-lg p-3 mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-white/40" />
                <Input 
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input pl-10"
                />
              </div>
              
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-white/40" />
                <Input 
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input pl-10"
                />
              </div>
              
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-sm text-nebula-accent hover:underline">
                  Forgot password?
                </Link>
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-nebula-primary hover:bg-nebula-primary/90 text-white"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </div>
          </form>
          
          <div className="my-6 flex items-center">
            <Separator className="flex-1 bg-white/10" />
            <span className="px-3 text-white/40 text-sm">OR</span>
            <Separator className="flex-1 bg-white/10" />
          </div>
          
          <Button 
            type="button"
            variant="outline"
            className="w-full border-white/20 hover:bg-white/5 text-white"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
              />
            </svg>
            Continue with Google
          </Button>
          
          <div className="mt-6 text-center">
            <p className="text-white/60">
              Don't have an account?{' '}
              <Link to="/signup" className="text-nebula-accent hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
