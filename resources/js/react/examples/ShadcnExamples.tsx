import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface FormData {
  name: string;
  email: string;
  message: string;
  category: string;
  notifications: boolean;
}

export const ShadcnExamples: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
      category: "",
      notifications: false,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    setOpen(false);
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Shadcn/UI Component Examples
        </h1>

        {/* Basic Components */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Basic Components
          </h2>

          {/* Buttons */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Buttons
            </h3>
            <div className="flex gap-3 flex-wrap">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          {/* Form Inputs */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Form Inputs
            </h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Enter your message" />
              </div>
            </div>
          </div>

          {/* Select */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Select
            </h3>
            <Select>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="support">Support</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Checkbox */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Checkbox
            </h3>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Accept terms and conditions
              </Label>
            </div>
          </div>
        </section>

        {/* Dialog Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Dialog Components
          </h2>

          {/* Regular Dialog */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Dialog
            </h3>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Open Contact Form</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Contact Us</DialogTitle>
                  <DialogDescription>
                    Fill out this form to get in touch with our team.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Your email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="general">General</SelectItem>
                              <SelectItem value="support">Support</SelectItem>
                              <SelectItem value="billing">Billing</SelectItem>
                              <SelectItem value="technical">
                                Technical
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Your message" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="notifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Email notifications</FormLabel>
                            <FormDescription>
                              Receive email notifications about your inquiry.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Send Message</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Alert Dialog */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Alert Dialog
            </h3>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </section>

        {/* Usage Note */}
        <section className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">
            How to Use These Components
          </h3>
          <div className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
            <p>• Import components from `@/components/ui/[component-name]`</p>
            <p>
              • Use the Form component with react-hook-form for form validation
            </p>
            <p>• All components support dark mode automatically</p>
            <p>• Components are fully accessible and keyboard navigable</p>
            <p>• Customize using Tailwind CSS classes or CSS variables</p>
          </div>
        </section>
      </div>
    </div>
  );
};
