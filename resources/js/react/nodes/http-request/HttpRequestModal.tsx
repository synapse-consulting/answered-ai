import React, { useEffect } from "react";
import DialogContainer from "../../components/DialogContainer";
import { SelectField } from "../../components/ui/SelectField";
import { CheckboxField } from "../../components/ui/CheckboxField";
import { KeyValueEditor } from "../../components/ui/KeyValueEditor";
import { CustomButton as Button } from "../../components/ui/Button";
import { HTTP_METHODS, AUTH_TYPES } from "../../types";
import { useReactFlow } from "@xyflow/react";
import { HttpConfig, HttpConfigSchema, HttpRequestNodeData } from "./types";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getNodeSuggestions } from "../../utils/jsonTraverser";
import useSuggestionData from "../hooks/useSuggestionData";
import { SuggestiveInput } from "@/react/components/ui/SuggestiveInput";
import { SuggestiveTextarea } from "@/react/components/ui/SuggestiveTextarea";

const defaults: HttpConfig = {
    method: "GET",
    url: "",
    queryParams: [],
    headers: [],
    body: {
        contentType: "none",
        content: "",
    },
    auth: {
        type: "none",
        username: "",
        password: "",
        token: "",
    },
    options: {
        followRedirects: true,
        verifySSL: true,
    },
};

interface HttpRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    nodeId?: string;
    initialConfig?: HttpConfig;
}

export const HttpRequestModal: React.FC<HttpRequestModalProps> = ({
    isOpen,
    onClose,
    nodeId,
}) => {
    const { updateNodeData, getNode } = useReactFlow();
    const initialConfig = getNode(nodeId ?? "")?.data as
        | HttpRequestNodeData
        | undefined;

    const [error, setError] = React.useState<string | null>(null);
    const [response, setResponse] = React.useState<any | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const {
        control,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors, isValid },
    } = useForm<HttpConfig>({
        resolver: zodResolver(HttpConfigSchema),
        defaultValues: { ...defaults, ...initialConfig?.config },
    });

    useEffect(() => {
        reset({ ...defaults, ...initialConfig?.config });
        setResponse(initialConfig?.result || null);
    }, [isOpen, initialConfig]);

    const updateBody = (contentType: string, content?: string) => {
        if (contentType === "none") {
            setValue("body.contentType", "none");
            setValue("body", undefined); // remove body
        } else {
            setValue("body", {
                contentType,
                content: content ?? watch("body.content") ?? "",
            });
        }
    };

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "queryParams",
    });
    // Add
    const addQueryParam = () => {
        append({ key: "", value: "" });
    };

    // Update
    const updateQueryParam = (
        index: number,
        field: "key" | "value",
        value: string
    ) => {
        const item = fields[index];
        update(index, { ...item, [field]: value });
    };

    // Remove
    const removeQueryParam = (index: number) => {
        remove(index);
    };
    const {
        fields: headerFields,
        append: appendHeader,
        update: updateHeader,
        remove: removeHeader,
    } = useFieldArray({
        control,
        name: "headers",
    });

    // Add
    const addHeader = () => {
        appendHeader({ key: "", value: "" });
    };

    // Update
    const handleUpdateHeader = (
        index: number,
        field: "key" | "value",
        value: string
    ) => {
        const item = headerFields[index];
        updateHeader(index, { ...item, [field]: value });
    };

    // Remove
    const handleRemoveHeader = (index: number) => {
        removeHeader(index);
    };

    const handleSave = async (data: HttpConfig) => {
        console.log("before node ID");
        if (!nodeId) return console.log("No node ID");

        setError(null);
        setIsLoading(true);

        try {
            const queryString = data.queryParams?.length
                ? "?" +
                  data.queryParams
                      .map(
                          (p) =>
                              `${encodeURIComponent(
                                  p.key
                              )}=${encodeURIComponent(p.value)}`
                      )
                      .join("&")
                : "";

            const headers =
                data.headers?.reduce((acc: Record<string, string>, h) => {
                    if (h.key && h.value) acc[h.key] = h.value;
                    return acc;
                }, {}) || {};

            let options: RequestInit = {
                method: data.method,
                headers,
            };

            if (
                ["POST", "PUT", "PATCH", "DELETE"].includes(
                    data.method.toUpperCase()
                )
            ) {
                options.body = data.body?.content || null;
                if (data.body?.contentType) {
                    options.headers = {
                        ...options.headers,
                        Accept: "application/json",
                        "Content-Type": data.body.contentType,
                    };
                }
            }

            const url = data.url + queryString;
            const response = await fetch(url, options);
            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message ||
                        `Request failed with status ${response.status}`
                );
            }
            console.log("Request successful:", data);

            updateNodeData(nodeId, (currentData) => {
                return {
                    ...currentData,
                    config: data,
                    result,
                    isConfigured: true,
                };
            });
            console.log(data);
            setResponse(result); // Update local state too
        } catch (error: any) {
            setError(
                error.message || "An error occurred while making the request"
            );
        } finally {
            setIsLoading(false);
        }
    };

    // useEffect(() => {
    //     if (isOpen) {
    //         reset(
    //             initialConfig || {
    //                 method: "GET",
    //                 url: "",
    //                 queryParams: [],
    //                 headers: [],
    //                 body: undefined,
    //                 auth: { type: "none" },
    //                 options: {
    //                     followRedirects: true,
    //                     verifySSL: true,
    //                 },
    //             }
    //         );
    //     }
    // }, [isOpen, initialConfig, reset]);

    const methodOptions = [
        { value: HTTP_METHODS.GET, label: "GET" },
        { value: HTTP_METHODS.POST, label: "POST" },
        { value: HTTP_METHODS.PUT, label: "PUT" },
        { value: HTTP_METHODS.DELETE, label: "DELETE" },
        { value: HTTP_METHODS.PATCH, label: "PATCH" },
    ];

    const authOptions = [
        { value: AUTH_TYPES.NONE, label: "No Authentication" },
        { value: AUTH_TYPES.BASIC, label: "Basic Auth" },
        { value: AUTH_TYPES.BEARER, label: "Bearer Token" },
    ];

    const bodyTypeOptions = [
        { value: "none", label: "No Body" },
        { value: "application/json", label: "JSON" },
        {
            value: "application/x-www-form-urlencoded",
            label: "Form URL Encoded",
        },
        { value: "multipart/form-data", label: "Form Data" },
        { value: "text/plain", label: "Raw" },
    ];

    const { allResults } = useSuggestionData();
    const nodessugg = getNodeSuggestions(allResults);

    // const errors = validateConfig();

    return (
        <DialogContainer
            isOpen={isOpen}
            onClose={onClose}
            title="HTTP Request Configuration"
            description="Configure your HTTP request parameters"
            maxWidth="2xl"
        >
            <div className="space-y-6">
                <form onSubmit={handleSubmit(handleSave)}>
                    {/* Basic Configuration */}
                    <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-1">
                            <Controller
                                name="method"
                                control={control}
                                render={({ field }) => (
                                    <SelectField
                                        label="Method"
                                        // {...field}
                                        value={field.value || "GET"}
                                        onChange={field.onChange}
                                        options={methodOptions}
                                        required
                                        placeholder={""}
                                        error={""}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-span-3">
                            <Controller
                                name="url"
                                control={control}
                                render={({ field }) => (
                                    <SuggestiveInput
                                        label="URL"
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="https://api.example.com/endpoint"
                                        type="url"
                                        required
                                        suggestions={nodessugg}
                                        error={errors.url?.message || ""}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    {/* Query Parameters */}
                    <Controller
                        name="queryParams"
                        control={control}
                        render={({ field }) => (
                            <KeyValueEditor
                                label="Query Parameters"
                                items={field.value}
                                onAdd={addQueryParam}
                                onUpdate={updateQueryParam}
                                onRemove={removeQueryParam}
                                keyPlaceholder="Parameter name"
                                valuePlaceholder="Parameter value"
                            />
                        )}
                    />

                    {/* Headers */}
                    <Controller
                        name="headers"
                        control={control}
                        render={({}) => (
                            <KeyValueEditor
                                label="Headers"
                                items={headerFields}
                                onAdd={addHeader}
                                onUpdate={handleUpdateHeader}
                                onRemove={handleRemoveHeader}
                                keyPlaceholder="Header name"
                                valuePlaceholder="Header value"
                            />
                        )}
                    />

                    {/* Authentication */}
                    <div className="space-y-4">
                        <Controller
                            name="auth.type"
                            control={control}
                            render={({ field, fieldState }) => (
                                <SelectField
                                    label="Authentication"
                                    value={field.value}
                                    onChange={field.onChange}
                                    options={authOptions}
                                    placeholder=""
                                    error={fieldState.error?.message || ""}
                                />
                            )}
                        />

                        {watch("auth.type") === AUTH_TYPES.BASIC && (
                            <div className="grid grid-cols-2 gap-4">
                                <Controller
                                    name="auth.username"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <SuggestiveInput
                                            label="Username"
                                            value={field.value || ""}
                                            onChange={field.onChange}
                                            placeholder="Enter username"
                                            required
                                            suggestions={nodessugg}
                                            error={
                                                fieldState.error?.message || ""
                                            }
                                        />
                                    )}
                                />
                                <Controller
                                    name="auth.password"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <SuggestiveInput
                                            label="Password"
                                            value={field.value || ""}
                                            onChange={field.onChange}
                                            placeholder="Enter password"
                                            type="password"
                                            required
                                            suggestions={nodessugg}
                                            error={
                                                fieldState.error?.message || ""
                                            }
                                        />
                                    )}
                                />
                            </div>
                        )}

                        {watch("auth.type") === AUTH_TYPES.BEARER && (
                            <Controller
                                name="auth.token"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <SuggestiveInput
                                        label="Bearer Token"
                                        value={field.value || ""}
                                        onChange={field.onChange}
                                        placeholder="Enter bearer token"
                                        required
                                        suggestions={nodessugg}
                                        error={fieldState.error?.message || ""}
                                    />
                                )}
                            />
                        )}
                    </div>

                    {/* Body Content */}
                    {watch("method") !== HTTP_METHODS.GET && (
                        <div className="space-y-4">
                            <Controller
                                name="body.contentType"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <SelectField
                                        label="Request Body"
                                        value={field.value || "none"}
                                        onChange={(value) => updateBody(value)} // RHF-friendly helper
                                        options={bodyTypeOptions}
                                        placeholder=""
                                        error={fieldState.error?.message || ""}
                                    />
                                )}
                            />

                            {watch("body") && (
                                <Controller
                                    name="body.content"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <SuggestiveTextarea
                                            label="Body Content"
                                            value={field.value || ""}
                                            // onChange={(value) =>
                                            //     updateBody(
                                            //         watch("body.contentType") ||
                                            //             "",
                                            //         value
                                            //     )
                                            // }
                                            onChange={field.onChange}
                                            placeholder={
                                                watch("body.contentType") ===
                                                "application/json"
                                                    ? '{\n  "key": "value"\n}'
                                                    : "Enter request body"
                                            }
                                            rows={5}
                                            suggestions={nodessugg}
                                            error={
                                                fieldState.error?.message || ""
                                            }
                                        />
                                    )}
                                />
                            )}
                        </div>
                    )}

                    {/* Options */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium text-gray-300">
                            Request Options
                        </h4>
                        <div className="space-y-3">
                            <Controller
                                name="options.followRedirects"
                                control={control}
                                render={({ field }) => (
                                    <CheckboxField
                                        label="Follow redirects"
                                        checked={field.value ?? false}
                                        onChange={field.onChange}
                                        description="Automatically follow HTTP redirects"
                                    />
                                )}
                            />
                            <Controller
                                name="options.verifySSL"
                                control={control}
                                render={({ field }) => (
                                    <CheckboxField
                                        label="Verify SSL certificates"
                                        checked={field.value ?? true}
                                        onChange={field.onChange}
                                        description="Verify SSL certificates for HTTPS requests"
                                    />
                                )}
                            />
                        </div>
                    </div>

                    {/* Response Section */}
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 my-5">
                            <h4 className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                                Request Failed
                            </h4>
                            <p className="text-sm text-red-700 dark:text-red-300">
                                {error}
                            </p>
                        </div>
                    )}
                    {response && (
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Response
                            </h4>
                            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                    {JSON.stringify(response, null, 2)}
                                </pre>
                            </div>
                        </div>
                    )}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700 mt-5">
                        <div className="flex justify-end gap-3 ">
                            <Button variant="secondary" onClick={onClose}>
                                Close
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={!isValid}
                                isLoading={isLoading}
                            >
                                Execute
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </DialogContainer>
    );
};
