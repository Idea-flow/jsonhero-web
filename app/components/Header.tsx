import { ShareIcon, PlusIcon, TrashIcon } from "@heroicons/react/outline";
import { DocumentTitle } from "./DocumentTitle";
import { DiscordIconTransparent } from "./Icons/DiscordIconTransparent";
import { EmailIconTransparent } from "./Icons/EmailIconTransparent";
import { GithubStar } from "./UI/GithubStar";
import { Logo } from "./Icons/Logo";
import { Share } from "./Share";
import { NewDocument } from "./NewDocument";
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "./UI/Popover";
import { Form } from "remix";
import { useJsonDoc } from "~/hooks/useJsonDoc";
import { LogoTriggerdotdev } from "./Icons/LogoTriggerdotdev";
import {NewFileWeb} from "~/components/NewFileWeb";

export function Header() {
  const { doc } = useJsonDoc();

  return (
      <header
          className="flex items-center justify-between w-screen h-[40px] bg-gradient-to-r from-white to-white dark:from-slate-700 dark:to-slate-800 overflow-hidden relative">

        <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-green-500/20 to-teal-500/20 dark:from-green-400/10 dark:to-teal-400/10 rounded-full blur-2xl"></div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-400/10 dark:to-purple-400/10 rounded-full blur-2xl"></div>
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-rose-500/20 dark:from-pink-400/10 dark:to-rose-400/10 rounded-full blur-2xl"></div>

        {/*<div className="flex pl-2 gap-1 sm:gap-1.5 pt-0.5 h-8 justify-center items-center">*/}
        {/*  <div className="w-20 sm:w-24">*/}
        {/*    <Logo />*/}
        {/*  </div>*/}
        {/*  <p className="text-slate-300 text-sm font-sans">by</p>*/}
        {/*  <LogoTriggerdotdev className="w-16 sm:w-20 opacity-80 hover:opacity-100  transition duration-300" />*/}
        {/*</div>*/}
        <div className="ml-10 z-10">
          <Popover>
            <PopoverTrigger>
              <button
                  className="flex items-center justify-center bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200 bg-opacity-90 dark:bg-opacity-80 text-base font-medium px-3 py-1 rounded hover:cursor-pointer hover:bg-opacity-100 dark:hover:bg-opacity-100 transition">
                <PlusIcon className="w-4 h-4 mr-1"></PlusIcon>
                新建
              </button>
            </PopoverTrigger>
            <PopoverContent side="bottom" sideOffset={8}>
              <NewDocument/>
              {/*  <NewFileWeb />*/}
              <PopoverArrow
                  className="fill-current text-indigo-700"
                  offset={20}
              />
            </PopoverContent>
          </Popover>
        </div>
        {/*<DocumentTitle />*/}
        {/*<ol className="flex text-sm items-center gap-2 px-4">*/}
        {/*  {!doc.readOnly && (*/}
        {/*    <Form*/}
        {/*      method="delete"*/}
        {/*      onSubmit={(e) =>*/}
        {/*        !confirm(*/}
        {/*          "This will permanantly delete this document from jsonhero.io, are you sure you want to continue?"*/}
        {/*        ) && e.preventDefault()*/}
        {/*      }*/}
        {/*    >*/}
        {/*      <button type="submit">*/}
        {/*        <button className="flex items-center justify-center py-1 bg-slate-200 text-slate-800 bg-opacity-80 text-base font-bold px-2 rounded uppercase hover:cursor-pointer hover:bg-opacity-100 transition">*/}
        {/*          <TrashIcon className="w-4 h-4 mr-0.5"></TrashIcon>*/}
        {/*          Delete*/}
        {/*        </button>*/}
        {/*      </button>*/}
        {/*    </Form>*/}
        {/*  )}*/}

        {/*  <Popover>*/}
        {/*    <PopoverTrigger>*/}
        {/*      <button className="flex items-center justify-center bg-lime-500 text-slate-800 bg-opacity-90 text-base font-bold px-2 py-1 rounded uppercase hover:cursor-pointer hover:bg-opacity-100 transition">*/}
        {/*        <PlusIcon className="w-4 h-4 mr-0.5"></PlusIcon>*/}
        {/*        New*/}
        {/*      </button>*/}
        {/*    </PopoverTrigger>*/}
        {/*    <PopoverContent side="bottom" sideOffset={8}>*/}
        {/*      <NewDocument />*/}
        {/*      <PopoverArrow*/}
        {/*        className="fill-current text-indigo-700"*/}
        {/*        offset={20}*/}
        {/*      />*/}
        {/*    </PopoverContent>*/}
        {/*  </Popover>*/}

        {/*  <Popover>*/}
        {/*    <PopoverTrigger>*/}
        {/*      <button className="flex items-center justify-center py-1 bg-slate-200 text-slate-800 bg-opacity-90 text-base font-bold px-2 rounded uppercase hover:cursor-pointer hover:bg-opacity-100 transition">*/}
        {/*        <ShareIcon className="w-4 h-4 mr-1"></ShareIcon>*/}
        {/*        Share*/}
        {/*      </button>*/}
        {/*    </PopoverTrigger>*/}
        {/*    <PopoverContent side="bottom" sideOffset={8}>*/}
        {/*      <Share />*/}
        {/*      <PopoverArrow*/}
        {/*        className="fill-current text-indigo-700"*/}
        {/*        offset={20}*/}
        {/*      />*/}
        {/*    </PopoverContent>*/}
        {/*  </Popover>*/}

        {/*  <li className="opacity-90 transition hover:cursor-pointer hover:opacity-100">*/}
        {/*    <GithubStar />*/}
        {/*  </li>*/}
        {/*  <li className="opacity-90 transition hover:cursor-pointer hover:opacity-100">*/}
        {/*    <a href="https://discord.gg/JtBAxBr2m3" target="_blank">*/}
        {/*      <DiscordIconTransparent />*/}
        {/*    </a>*/}
        {/*  </li>*/}
        {/*</ol>*/}
      </header>
  );
}