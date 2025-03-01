import React, { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface InputFormProps {
  onSubmit?: (data: FormData) => void;
  isLoading?: boolean;
}

interface FormData {
  firstName: string;
  middleName?: string;
  lastName: string;
  birthDate: string;
}

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  birthDate: z.string().min(1, "Birth date is required"),
});

const InputForm = ({
  onSubmit = (data) => console.log("Form submitted:", data),
  isLoading = false,
}: InputFormProps) => {
  const [formStep, setFormStep] = useState<number>(0);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      birthDate: "",
    },
  });

  const handleSubmit = (data: FormData) => {
    onSubmit(data);
  };

  const nextStep = () => {
    const nameFields = ["firstName", "middleName", "lastName"];
    const isValid = nameFields.every((field) => {
      if (field === "middleName") return true; // Middle name is optional
      return form.getValues(field as keyof FormData) !== "";
    });

    if (isValid) {
      setFormStep(1);
    } else {
      form.trigger(["firstName", "lastName"]);
    }
  };

  const prevStep = () => {
    setFormStep(0);
  };

  return (
    <Card className="w-full max-w-[600px] mx-auto bg-slate-800 shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <CardTitle className="text-2xl font-bold text-center">
          Numerology Calculator
        </CardTitle>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="p-6">
            <motion.div
              initial={{ opacity: 0, x: formStep === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: formStep === 0 ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {formStep === 0 ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-center text-white">
                    Enter Your Name
                  </h3>

                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your first name"
                            {...field}
                            className="border-gray-600 bg-slate-700 text-white focus:border-indigo-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="middleName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">
                          Middle Name{" "}
                          <span className="text-gray-300">(Optional)</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your middle name (if any)"
                            {...field}
                            className="border-gray-600 bg-slate-700 text-white focus:border-indigo-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your last name"
                            {...field}
                            className="border-gray-600 bg-slate-700 text-white focus:border-indigo-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-center text-white">
                    Enter Your Birth Date
                  </h3>

                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Birth Date</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            placeholder="MM/DD/YYYY"
                            {...field}
                            className="border-gray-600 bg-slate-700 text-white focus:border-indigo-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-4">
                    <p className="text-sm text-gray-300 text-center">
                      Your birth date is used to calculate your Life Path
                      Number, one of the most important numbers in numerology.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </CardContent>

          <CardFooter className="flex justify-between p-6 pt-0 border-t border-gray-700">
            {formStep === 1 ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={isLoading}
                  className="border-gray-600 text-white hover:bg-gray-700"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white"
                >
                  {isLoading ? "Calculating..." : "Calculate Numerology"}
                </Button>
              </>
            ) : (
              <>
                <div></div> {/* Empty div for spacing */}
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white"
                >
                  Next
                </Button>
              </>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default InputForm;
