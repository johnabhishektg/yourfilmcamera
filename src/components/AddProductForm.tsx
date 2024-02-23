"use client";

import { checkProduct } from "@/app/(actions)/product";
import { products } from "@/lib/db/schema";
import { createProductSchema } from "@/lib/types";
import { catchError } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const AddProductForm = ({}) => {
  const [isPending, startTransition] = React.useTransition();

  const form = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "skateboards",
      images: "",
    },
  });

  function onSubmit(data: z.infer<typeof createProductSchema>) {
    startTransition(async () => {
      try {
        await checkProduct({
          name: data.name,
        });

        // await addProduct({
        //   ...data,
        // });

        toast.success("Product added successfully.");

        form.reset();
      } catch (err) {
        catchError(err);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-2xl gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Type product name here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type product description here."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value: typeof field.value) =>
                    field.onChange(value)
                  }
                >
                  <FormControl>
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(products.category.enumValues).map(
                        (option) => (
                          <SelectItem
                            key={option}
                            value={option}
                            className="capitalize"
                          >
                            {option}
                          </SelectItem>
                        )
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col items-start gap-6 sm:flex-row">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type price."
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Images</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type image path here."
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormItem className="flex w-full flex-col gap-1.5">
      <FormLabel>Images</FormLabel>
      {files?.length ? (
        <div className="flex items-center gap-2">
          {files.map((file, i) => (
            <Zoom key={i}>
              <Image
                src={file.preview}
                alt={file.name}
                className="size-20 shrink-0 rounded-md object-cover object-center"
                width={80}
                height={80}
              />
            </Zoom>
          ))}
        </div>
      ) : null}
      <FormControl>
        <FileDialog
          setValue={form.setValue}
          name="images"
          maxFiles={3}
          maxSize={1024 * 1024 * 4}
          files={files}
          setFiles={setFiles}
          isUploading={isUploading}
          disabled={isPending}
        />
      </FormControl>
      <UncontrolledFormMessage
        message={form.formState.errors.images?.message}
      />
    </FormItem> */}
        <Button
          onClick={() => void form.trigger(["name", "description", "price"])}
          className="w-full"
          disabled={isPending}
        >
          {isPending && (
            <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
          )}
          Add Product
          <span className="sr-only">Add Product</span>
        </Button>
      </form>
    </Form>
  );
};
