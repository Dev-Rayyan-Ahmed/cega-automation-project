// 1. Define the shape of your props otherwise it will give error, bcz of tsx
interface InputProps {
      label: string;
      name: string;
      type?: string;
      value: string;
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
      required?: boolean;
}

// Reusable Components to keep it clean
export function TextInputField({ label, name, type = "text", value, onChange, required = true }: InputProps) {
return(
      <div>
            <label className="block mb-1 font-medium text-gray-600">{label}</label>
            <input
                  type={type}
                  name={name}
                  value={value}
                  onChange={onChange}
                  className="w-full border rounded-lg p-2 outline-none focus:ring-4 focus:ring-blue-900/20 transition-all"
                  required={required}
                  />
      </div>
);
}


export function TextAreaField({ label, name, value, onChange, required = true}: InputProps) {

      return(
      <div>
            <label className="block mb-1 font-medium text-gray-600">{label}</label>
            <textarea
                  name={name}
                  value={value}
                  onChange={onChange}
                  rows={3}
                  className="w-full border rounded-lg p-2 outline-none focus:ring-4 focus:ring-blue-900/20 transition-all resize-none"
                  required={required}/>
      </div>
);
}