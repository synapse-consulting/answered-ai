@extends('layouts.app')
@section('title', 'Profile')
@section('content')
    <div class="grid grid-cols-12" x-data="intents" x-init="$nextTick(() => { showEditModal = false; showCreateModal = false; })">
        <div class="col-span-12">
            <div class="flex h-screen text-white">
                <x-profile-sidebar />
                
                <div class="flex-1 overflow-y-auto dark-scrollbar bg-white">
                    <x-card>
                        <div class="flex items-center justify-between pb-6 border-b border-gray-200">
                            <div>
                                <h1 class="text-left text-xl font-semibold text-gray-800">Intents</h1>
                                <p class="text-sm text-gray-500">Manage your intents for the workspace</p>
                            </div>
                            <x-button @click="openCreateModal" type="button" class="btn-primary">
                                Create Intent
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

                                <template x-for="intent in intents" :key="intent.id">
                                    <tr>
                                        <td x-text="intent.name"></td>
                                        <td x-text="intent.description"></td>
                                        <td>
                                            <x-button @click="openEditModal(intent)" class="btn-primary">
                                                <i class="fa fa-edit"></i>
                                            </x-button>
                                            <x-button @click="deleteIntent(intent.id)" class="btn-danger">
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
            <x-modal id="createIntentModal" x-show="showCreateModal" x-cloak @click.away="showCreateModal = false">
                <x-slot name="header">
                    <h3 class="text-lg font-semibold text-gray-800">Add Intent</h3>
                </x-slot> 
            <form @submit.prevent="createIntent">
                <div class="space-y-4">
                    <div>
                        <x-input label="Name" required type="text" name="name" x-model="form.name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Enter intent name" required validate="name" />
                    </div>
                    <div>
                        <x-textarea label="Description" required name="description" x-model="form.description" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Enter intent description" required validate="description"></x-textarea>
                    </div>
                    <div class="flex justify-end space-x-3">
                        <x-button @click="showCreateModal = false" type="button" class="btn-secondary">Cancel</x-button>
                        <x-button type="submit" class="btn-primary">Create</x-button>
                    </div>
                </div>
            </form>
        </x-modal>
        </template>

        <!-- Edit Modal -->
        <template x-if="showEditModal">
            <x-modal id="editIntentModal" x-show="showEditModal" x-cloak @click.away="showEditModal = false">
                <x-slot name="header">
                    <h3 class="text-lg font-semibold text-gray-800">Edit Intent</h3>
                </x-slot> 
            <form @submit.prevent="updateIntent">
                <div class="space-y-4">
                    <div>
                        <x-input label="Name" name="name" type="text" x-model="form.name" placeholder="Enter intent name" required />
                    </div>
                    <div>
                        <x-textarea name="description" label="Description" 
                        x-model="form.description" placeholder="Enter intent description" required></x-textarea>
                    </div>
                    <div class="flex justify-end space-x-3">
                        <x-button @click="showEditModal = false" type="button" btntype="btn-secondary">Cancel</x-button>
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
    document.addEventListener('alpine:init', () => {
        Alpine.data('intents', () => ({
            intents: @json($intents),
            showCreateModal: false,
            showEditModal: false,
            form: {
                id: null,
                name: '',
                description: ''
            },

            init() {
                this.showEditModal = false;
                this.showCreateModal = false;
            },

            openCreateModal() {
                this.form = { id: null, name: '', description: '' };
                this.showCreateModal = true;
            },

            openEditModal(intent) {
                this.form = { ...intent };
                this.showEditModal = true;
            },

            async createIntent() {
                try {
                    const response = await fetch('/profile/workspace/intents', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                        },
                        body: JSON.stringify(this.form)
                    });

                    if (!response.ok) throw new Error('Failed to create intent');

                    const data = await response.json();
                    this.intents.push({ ...this.form, id: data.id });
                    this.showCreateModal = false;
                    this.form = { id: null, name: '', description: '' };
                } catch (error) {
                    console.error('Error:', error);
                    alert('Failed to create intent');
                }
            },

            async updateIntent() {
                console.log('Updating intent:', this.form);
                try {
                    const response = await fetch(`/profile/workspace/intents/${this.form.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                        },
                        body: JSON.stringify(this.form)
                    });

                    if (!response.ok) throw new Error('Failed to update intent');

                    const index = this.intents.findIndex(i => i.id === this.form.id);
                    this.intents[index] = { ...this.form };
                    this.showEditModal = false;
                    this.form = { id: null, name: '', description: '' };
                } catch (error) {
                    console.error('Error:', error);
                    alert('Failed to update intent');
                }
            },

            async deleteIntent(id) {
                if (!confirm('Are you sure you want to delete this intent?')) return;

                try {
                    const response = await fetch(`/api/intents/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                        }
                    });

                    if (!response.ok) throw new Error('Failed to delete intent');

                    this.intents = this.intents.filter(i => i.id !== id);
                } catch (error) {
                    console.error('Error:', error);
                    alert('Failed to delete intent');
                }
            }
        }));
    });
</script>
@endsection