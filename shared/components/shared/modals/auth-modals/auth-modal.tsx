'use client'

import { Button, Dialog } from "@/shared/components/ui";
import { DialogContent } from "@/shared/components/ui/dialog";
import { LoginForm } from "../forms/login-form";
import { useState } from "react";

type PropsType = {
    open: boolean;
    onClose: () => void;
    onSignInProvider: (provider: 'github' | 'google') => void;
  }

export const AuthModal = ({ open, onClose, onSignInProvider } : PropsType) => {

  const [type, setType]= useState<'login' | 'register'>('login')

  const onSwitchType = () => {
    type === 'login' ? setType('register') : setType('login')
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[450px] bg-white p-10">

      {type === 'login' ? <LoginForm onClose={() => console.log('close')}/> : <h2>Register</h2>}

        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => onSignInProvider('google')}
            type="button"
            className="gap-2 h-12 p-2 flex-1">
            <img className="w-6 h-6" src="https://github.githubassets.com/favicons/favicon.svg" />
            GitHub
          </Button>

          <Button
            variant="secondary"
            onClick={() => onSignInProvider('google')}
            type="button"
            className="gap-2 h-12 p-2 flex-1">
            <img
              className="w-6 h-6"
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
            />
            Google
          </Button>
          
        </div>

        <Button variant="outline" onClick={onSwitchType} type="button" className="h-12">
          {type !== 'login' ? 'Войти' : 'Регистрация'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
