import { Button } from "@nextui-org/react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex gap-4 items-center">
        <Button color="success" >
          Take a photo
        </Button>
        <Button color="danger" variant="bordered" >
          Delete user
        </Button>
      </div>
    </main>
  )
}
