import {SideBar, Canvas , ScriptArea} from './components';

export default function App() {
  return (
    <main className="h-screen flex">

      {/* Left Sidebar starts here*/}
      <SideBar />
      {/* Left Sidebar ends here*/}

      {/* Middle Script Area starts here*/}
      <section className="flex-1 bg-white p-4 border-r border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Script Area</h2>
        <ScriptArea />
      </section>
      {/* Middle Script Area ends here*/}

      {/* Right Panel starts here*/}
      <section className="w-72 flex flex-col h-screen">
        <Canvas />
      </section>
      {/* Right Panel ends here*/}

    </main>
  );
}