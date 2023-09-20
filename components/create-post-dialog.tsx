"use client";

import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { MultipleFilter } from "./multiple-filter";
import { DateTimePicker } from "./ui/date-time-picker/date-time-picker";
import { Icons } from "./ui/icons";

const FormSchema = z.object({
  message: z.string(),
  senders: z.string().array().min(1),
  schedule: z.any().optional(),
});

export const socials = [
  {
    value: "facebook",
    label: "Facebook",
    icon: Icons.facebook,
  },
  {
    value: "instagram",
    label: "Instagram",
    icon: Icons.instagram,
    disabled: true,
  },
  {
    value: "twitter",
    label: "Twitter",
    icon: Icons.twitter,
    disabled: true,
  },
];

export function CreatePostDialog() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create a post</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[70vw] h-[50vh]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col"
          >
            <DialogHeader>
              <DialogTitle>Create a post</DialogTitle>
              <DialogDescription>
                Make changes to your post here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="py-5 flex-1 flex-col">
              <div className="mt-3">
                <FormField
                  control={form.control}
                  name="senders"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <MultipleFilter
                          title="Socials"
                          options={socials}
                          value={field.value}
                          onChange={(value) => field.onChange(value)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-3">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little bit about yourself"
                          className="resize-none"
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-3 w-1/2">
                <FormField
                  control={form.control}
                  name="schedule"
                  render={({ field }) => (
                    <FormItem>
                      <DateTimePicker
                        granularity={"minute"}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
