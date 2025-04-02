export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm">
      {"success" in message && (
        <div className="bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-300 border-l-4 border-green-500 px-4 py-2 rounded-md">
          {message.success}
        </div>
      )}
      {"error" in message && (
        <div className="bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 border-l-4 border-red-500 px-4 py-2 rounded-md">
          {message.error}
        </div>
      )}
      {"message" in message && (
        <div className="bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500 px-4 py-2 rounded-md">
          {message.message}
        </div>
      )}
    </div>
  );
}
