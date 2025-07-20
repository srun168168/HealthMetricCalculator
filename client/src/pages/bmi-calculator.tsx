import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Calculator, RotateCcw, Heart, CheckCircle, Info, Save, History } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import type { BmiRecord, InsertBmiRecord } from "@shared/schema";

const bmiFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  age: z.string().min(1, "Age is required"),
  weight: z.string().min(1, "Weight is required"),
  heightCm: z.string().optional(),
  heightFeet: z.string().optional(),
  heightInches: z.string().optional(),
}).refine(
  (data) => {
    return data.heightCm || (data.heightFeet && data.heightInches);
  },
  {
    message: "Please enter a valid height",
    path: ["heightCm"],
  }
);

type BMIFormData = z.infer<typeof bmiFormSchema>;

interface BMIResult {
  bmi: number;
  category: string;
  categoryClass: string;
}

export default function BMICalculator() {
  const [heightUnit, setHeightUnit] = useState<'metric' | 'imperial'>('metric');
  const [weightUnit, setWeightUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<BMIResult | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Fetch BMI records
  const { data: bmiRecords = [], isLoading: recordsLoading } = useQuery<BmiRecord[]>({
    queryKey: ["/api/bmi-records"],
  });
  
  // Mutation to save BMI record
  const saveBmiMutation = useMutation({
    mutationFn: async (record: InsertBmiRecord) => {
      const response = await fetch("/api/bmi-records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
      if (!response.ok) throw new Error("Failed to save BMI record");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bmi-records"] });
      toast({
        title: "Success!",
        description: "BMI calculation saved successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to save BMI record",
        variant: "destructive",
      });
    },
  });

  const form = useForm<BMIFormData>({
    resolver: zodResolver(bmiFormSchema),
    defaultValues: {
      name: '',
      age: '',
      weight: '',
      heightCm: '',
      heightFeet: '',
      heightInches: '',
    },
  });

  const calculateBMI = (data: BMIFormData) => {
    let heightInMeters: number;
    let weightInKg: number;

    // Convert height to meters
    if (heightUnit === 'metric') {
      heightInMeters = (parseFloat(data.heightCm || '0')) / 100;
    } else {
      const totalInches = (parseFloat(data.heightFeet || '0')) * 12 + (parseFloat(data.heightInches || '0'));
      heightInMeters = totalInches * 0.0254;
    }

    // Convert weight to kg
    if (weightUnit === 'metric') {
      weightInKg = parseFloat(data.weight);
    } else {
      weightInKg = parseFloat(data.weight) * 0.453592; // pounds to kg
    }

    const bmi = weightInKg / (heightInMeters * heightInMeters);
    
    let category: string;
    let categoryClass: string;

    if (bmi < 18.5) {
      category = "Underweight";
      categoryClass = "bg-blue-100 text-blue-800";
    } else if (bmi < 25) {
      category = "Normal Weight";
      categoryClass = "bg-green-100 text-green-800";
    } else if (bmi < 30) {
      category = "Overweight";
      categoryClass = "bg-yellow-100 text-yellow-800";
    } else {
      category = "Obese";
      categoryClass = "bg-red-100 text-red-800";
    }

    return {
      bmi: Math.round(bmi * 10) / 10,
      category,
      categoryClass,
    };
  };

  const onSubmit = (data: BMIFormData) => {
    const bmiResult = calculateBMI(data);
    setResult(bmiResult);
    
    // Scroll to results
    setTimeout(() => {
      const resultsElement = document.getElementById('resultsCard');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  
  const saveBmiRecord = async () => {
    if (!result) return;
    
    const formData = form.getValues();
    let heightInCm: number;
    
    // Convert height to centimeters for storage
    if (heightUnit === 'metric') {
      heightInCm = parseFloat(formData.heightCm || '0');
    } else {
      const totalInches = (parseFloat(formData.heightFeet || '0')) * 12 + (parseFloat(formData.heightInches || '0'));
      heightInCm = totalInches * 2.54;
    }
    
    let weightInKg: number;
    if (weightUnit === 'metric') {
      weightInKg = parseFloat(formData.weight);
    } else {
      weightInKg = parseFloat(formData.weight) * 0.453592;
    }
    
    const record: InsertBmiRecord = {
      userId: null, // For now, we'll allow anonymous records
      name: formData.name,
      age: parseInt(formData.age),
      weight: weightInKg,
      height: heightInCm,
      bmi: result.bmi,
      category: result.category,
    };
    
    saveBmiMutation.mutate(record);
  };

  const resetForm = () => {
    form.reset({
      name: '',
      age: '',
      weight: '',
      heightCm: '',
      heightFeet: '',
      heightInches: '',
    });
    setResult(null);
    setHeightUnit('metric');
    setWeightUnit('metric');
  };

  const toggleHeightUnit = (unit: 'metric' | 'imperial') => {
    setHeightUnit(unit);
    // Clear height fields when switching units
    form.setValue('heightCm', '');
    form.setValue('heightFeet', '');
    form.setValue('heightInches', '');
  };

  const toggleWeightUnit = (unit: 'metric' | 'imperial') => {
    setWeightUnit(unit);
    // Clear weight field when switching units
    form.setValue('weight', '');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Calculator className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">BMI Calculator</h1>
          <p className="text-gray-600">Calculate your Body Mass Index and get health insights</p>
        </div>

        {/* Main Calculator Card */}
        <Card className="bg-white rounded-xl shadow-lg mb-6">
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Input */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Age Input */}
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">Age</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter your age"
                            className="pr-16"
                            {...field}
                          />
                        </FormControl>
                        <span className="absolute right-4 top-3 text-gray-400 text-sm">years</span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Height Input Section */}
                <div className="space-y-4">
                  <Label className="block text-sm font-semibold text-gray-700">Height</Label>
                  
                  {/* Unit Toggle for Height */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() => toggleHeightUnit('metric')}
                      className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                        heightUnit === 'metric'
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      Centimeters
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleHeightUnit('imperial')}
                      className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                        heightUnit === 'imperial'
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      Feet & Inches
                    </button>
                  </div>

                  {/* Metric Height Input */}
                  {heightUnit === 'metric' && (
                    <FormField
                      control={form.control}
                      name="heightCm"
                      render={({ field }) => (
                        <FormItem>
                          <div className="relative">
                            <FormControl>
                              <Input
                                type="number"
                                step="0.1"
                                placeholder="Enter height in centimeters"
                                className="pr-12"
                                {...field}
                              />
                            </FormControl>
                            <span className="absolute right-4 top-3 text-gray-400 text-sm">cm</span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* Imperial Height Input */}
                  {heightUnit === 'imperial' && (
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="heightFeet"
                        render={({ field }) => (
                          <FormItem>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Feet"
                                  className="pr-10"
                                  {...field}
                                />
                              </FormControl>
                              <span className="absolute right-4 top-3 text-gray-400 text-sm">ft</span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="heightInches"
                        render={({ field }) => (
                          <FormItem>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Inches"
                                  className="pr-10"
                                  {...field}
                                />
                              </FormControl>
                              <span className="absolute right-4 top-3 text-gray-400 text-sm">in</span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>

                {/* Weight Input Section */}
                <div className="space-y-4">
                  <Label className="block text-sm font-semibold text-gray-700">Weight</Label>
                  
                  {/* Unit Toggle for Weight */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() => toggleWeightUnit('metric')}
                      className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                        weightUnit === 'metric'
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      Kilograms
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleWeightUnit('imperial')}
                      className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                        weightUnit === 'imperial'
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      Pounds
                    </button>
                  </div>

                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type="number"
                              step="0.1"
                              placeholder="Enter your weight"
                              className="pr-12"
                              {...field}
                            />
                          </FormControl>
                          <span className="absolute right-4 top-3 text-gray-400 text-sm">
                            {weightUnit === 'metric' ? 'kg' : 'lbs'}
                          </span>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Calculator className="w-4 h-4 mr-2" />
                    Calculate BMI
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={resetForm}
                    className="sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-700"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowHistory(!showHistory)}
                    className="sm:w-auto"
                  >
                    <History className="w-4 h-4 mr-2" />
                    {showHistory ? 'Hide' : 'Show'} History
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Results Card */}
        {result && (
          <Card id="resultsCard" className="bg-white rounded-xl shadow-lg">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your BMI Result</h2>
                
                {/* BMI Value Display */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {result.bmi}
                  </div>
                  <div className="text-gray-600">BMI Score</div>
                </div>

                {/* BMI Category */}
                <div className="mb-6">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full font-medium ${result.categoryClass}`}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {result.category}
                  </div>
                </div>

                {/* BMI Categories Reference */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">BMI Categories</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center justify-between p-3 bg-blue-100 text-blue-800 rounded-lg">
                      <span className="font-medium">Underweight</span>
                      <span>&lt; 18.5</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-100 text-green-800 rounded-lg">
                      <span className="font-medium">Normal</span>
                      <span>18.5 - 24.9</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-100 text-yellow-800 rounded-lg">
                      <span className="font-medium">Overweight</span>
                      <span>25.0 - 29.9</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-100 text-red-800 rounded-lg">
                      <span className="font-medium">Obese</span>
                      <span>≥ 30.0</span>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="mt-6 text-center">
                  <Button
                    onClick={saveBmiRecord}
                    disabled={saveBmiMutation.isPending}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saveBmiMutation.isPending ? "Saving..." : "Save Result"}
                  </Button>
                </div>

                {/* Health Note */}
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start">
                    <Info className="w-5 h-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-sm text-amber-800">
                      <strong>Note:</strong> BMI is a general indicator and may not account for muscle mass, bone density, or other factors. Consult with a healthcare professional for personalized health advice.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* BMI History Section */}
        {showHistory && (
          <Card className="bg-white rounded-xl shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">BMI History</h2>
              
              {recordsLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="mt-2 text-gray-600">Loading history...</p>
                </div>
              ) : bmiRecords.length === 0 ? (
                <div className="text-center py-8">
                  <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No BMI records found</p>
                  <p className="text-sm text-gray-500 mt-1">Calculate and save your first BMI to see history</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bmiRecords.slice(0, 10).map((record: BmiRecord) => (
                    <div
                      key={record.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 mb-1">
                          {record.name}
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-gray-600">
                            Age: {record.age}
                          </div>
                          <div className="text-sm text-gray-600">
                            Weight: {record.weight.toFixed(1)} kg
                          </div>
                          <div className="text-sm text-gray-600">
                            Height: {record.height.toFixed(0)} cm
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(record.createdAt).toLocaleDateString()} at {new Date(record.createdAt).toLocaleTimeString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-blue-600">
                          {record.bmi.toFixed(1)}
                        </div>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          record.category === 'Normal Weight' 
                            ? 'bg-green-100 text-green-800'
                            : record.category === 'Underweight'
                            ? 'bg-blue-100 text-blue-800'
                            : record.category === 'Overweight'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {record.category}
                        </div>
                      </div>
                    </div>
                  ))}
                  {bmiRecords.length > 10 && (
                    <p className="text-sm text-gray-500 text-center mt-4">
                      Showing recent 10 records out of {bmiRecords.length} total
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Footer Information */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">
            <Heart className="w-4 h-4 text-red-400 mr-1 inline" />
            BMI Calculator for health awareness and fitness tracking
          </p>
        </div>
      </div>
    </div>
  );
}
