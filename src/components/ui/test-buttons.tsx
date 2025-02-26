export function TestButtons() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-4">
        <button className="btn btn-primary">DaisyUI Primary</button>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded">
          Shadcn Primary
        </button>
      </div>
      <div>
        <span className="text-primary font-bold">Primary Text Color</span>
      </div>
    </div>
  );
}
