@extends('layouts.app')
@section('title', 'Workflows')
@section('content')
    <div class="grid grid-cols-12" x-data="workflows" x-init="$nextTick(() => { showEditModal = false;
        showCreateModal = false; })">
        <div class="col-span-12">
            <div class="flex h-screen text-white">

                <div class="h-screen flex-1 overflow-y-auto dark-scrollbar bg-white">
                    <x-card>
                        <div class="flex items-center justify-between pb-6 border-b border-gray-200">
                            <div>
                                <h1 class="text-left text-xl font-semibold text-gray-800">Workflows</h1>
                                <p class="text-sm text-gray-500">Manage your workflows</p>
                            </div>
                            <x-button @click="openCreateModal" type="button" class="btn-primary">
                                Create Workflow
                            </x-button>
                        </div>
                        <div class="overflow-x-auto">
                            <x-table>
                                <x-slot name="header">
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Actions</th>
                                    </tr>
                                </x-slot>

                                <template x-for="workflow in workflows" :key="workflow.id">
                                    <tr>
                                        <td x-text="workflow.name"></td>
                                        <td x-text="workflow.description"></td>
                                        <td>
                                              <!-- Use Alpine for dynamic href -->
                                            <a class="btn bg-gray-800 hover:bg-gray-900 inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white transition rounded-lg shadow-theme-xs" :href="`/workflows/${workflow.id}/edit?id=${workflow.id}`" class="btn btn-primary">
                                                <i class="fa fa-project-diagram"></i>
                                            </a>
                                            <x-button @click="openEditModal(workflow)" class="btn-primary">
                                                <i class="fa fa-edit"></i>
                                            </x-button>
                                            <x-button @click="deleteWorkflow(workflow.id)" class="btn-danger">
                                                <i class="fa fa-trash"></i>
                                            </x-button>
                                        </td>
                                    </tr>
                                </template>
                            </x-table>
                        </div>
                    </x-card>
                </div>
            </div>
        </div>

        <!-- Create Modal -->
        <template x-if="showCreateModal">
            <x-modal id="createWorkflowModal" x-show="showCreateModal" x-cloak @click.away="showCreateModal = false">
                <x-slot name="header">
                    <h3 class="text-lg font-semibold text-gray-800">Create Workflow</h3>
                </x-slot>
                <form @submit.prevent="createWorkflow">
                    <div class="space-y-4">
                        <div>
                            <x-input label="Name" required type="text" name="name" x-model="form.name"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                placeholder="Enter name" required validate="name" />
                        </div>
                        <div>
                            <x-textarea label="Description" required name="description" x-model="form.description"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                placeholder="Enter description" required validate="description"></x-textarea>
                        </div>
                        <div class="flex justify-end space-x-3">
                            <x-button @click="showCreateModal = false" type="button"
                                class="btn-secondary">Cancel</x-button>
                            <x-button type="submit" class="btn-primary">Create</x-button>
                        </div>
                    </div>
                </form>
            </x-modal>
        </template>

        <!-- Edit Modal -->
        <template x-if="showEditModal">
            <x-modal id="editWorkflowModal" x-show="showEditModal" x-cloak @click.away="showEditModal = false">
                <x-slot name="header">
                    <h3 class="text-lg font-semibold text-gray-800">Edit Workflow</h3>
                </x-slot>
                <form @submit.prevent="updateWorkflow">
                    <div class="space-y-4">
                        <div>
                            <x-input label="Name" name="name" type="text" x-model="form.name"
                                placeholder="Enter name" required />
                        </div>
                        <div>
                            <x-textarea name="description" label="Description" x-model="form.description"
                                placeholder="Enter Description" required></x-textarea>
                        </div>
                        <div class="flex justify-end space-x-3">
                            <x-button @click="showEditModal = false" type="button"
                                btntype="btn-secondary">Cancel</x-button>
                            <x-button type="submit" class="btn-primary">Update</x-button>
                        </div>
                    </div>
                </form>
            </x-modal>
        </template>
    </div>
@endsection

@section('scripts')
    <script>

function getMetaContent(name) {
  const meta = document.querySelector(`meta[name="${name}"]`);
  return meta ? meta.getAttribute("content") : null;
}

        document.addEventListener('alpine:init', () => {
            Alpine.data('workflows', () => ({
                workflows: @json($workflows),
                showCreateModal: false,
                showEditModal: false,
                form: {
                    id: '',
                    name: '',
                    intent_id: '',
                    description: ''
                },

                init() {
                    this.showEditModal = false;
                    this.showCreateModal = false;
                },

                openCreateModal() {
                    this.form = {
                        id: null,
                        name: '',
                        description: '', 
                        intent_id: '', 
                    };
                    this.showCreateModal = true;
                },

                openEditModal(intent) {
                    this.form = {
                        ...intent
                    };
                    this.showEditModal = true;
                },

                async createWorkflow() {
                    try {
                        const url = getMetaContent('app-url') + '/workflows';
                        const response = await fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'X-CSRF-TOKEN': document.querySelector(
                                    'meta[name="csrf-token"]').content
                            },
                            body: JSON.stringify(this.form)
                        });
                        console.log(response);

                        if (!response.ok) throw new Error('Failed to create workflow');

                        const data = await response.json();

                        this.workflows.push({
                            ...this.form,
                            id: data.workflow.id
                        });

                        window.location.href = `${url}/${data.workflow.id}/edit?id=data.workflow.id`;

                        this.showCreateModal = false;

                        this.form = {
                            id: null,
                            name: '',
                            intent_id: '',
                            description: ''
                        };
                    } catch (error) {
                        console.error('Error:', error);
                        alert('Failed to create workflow');
                    }
                },

                async updateWorkflow() {
                    const url = getMetaContent('app-url') + "/workflows/" + this.form.id;  
                    try {
                        const response = await fetch(url, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-CSRF-TOKEN': document.querySelector(
                                    'meta[name="csrf-token"]').content
                            },
                            body: JSON.stringify(this.form)
                        });

                        if (!response.ok) throw new Error('Failed to update workflow');

                        const index = this.workflows.findIndex(i => i.id === this.form.id);
                        this.workflows[index] = {
                            ...this.form
                        };
                        this.showEditModal = false;
                        this.form = {
                            id: null,
                            name: '',
                            intent_id:'', 
                            description: ''
                        };
                    } catch (error) {
                        console.error('Error creating workflow: ', error);
                        alert('Failed to update workflow');
                    }
                },

                async deleteWorkflow(id) {
                    const url = getMetaContent('app-url') + "/workflows/" + id;  
                    if (!confirm('Are you sure you want to delete this workflow?')) return;

                    try {
                        const response = await fetch(url, {
                            method: 'DELETE',
                            headers: {
                                'X-CSRF-TOKEN': document.querySelector(
                                    'meta[name="csrf-token"]').content
                            }
                        });

                        if (!response.ok) throw new Error('Failed to delete workflow');

                        this.workflows = this.workflows.filter(i => i.id !== id);
                    } catch (error) {
                        console.error('Error:', error);
                        alert('Failed to delete workflow');
                    }
                }
            }));
        });
    </script>
@endsection
