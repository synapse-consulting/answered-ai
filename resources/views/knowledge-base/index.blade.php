@extends('layouts.app')
@section('title', 'Knowledge Base')
@section('content')
    <div class="grid grid-cols-12" x-data="knowledgeBase" x-init="$nextTick(() => { showEditModal = false; showCreateModal = false; })">
        <div class="col-span-12">
            <div class="flex h-screen text-white">
                <div class="h-screen flex-1 overflow-y-auto dark-scrollbar bg-white">
                    <x-card>
                        <div class="flex items-center justify-between pb-6 border-b border-gray-200">
                            <div>
                                <h1 class="text-left text-xl font-semibold text-gray-800">Knowledge Base</h1>
                                <p class="text-sm text-gray-500">Manage knowledge base resources</p>
                            </div>
                            <x-button @click="openCreateModal" type="button" class="btn-primary">
                                Create Resource
                            </x-button>
                        </div>

                        <div class="overflow-x-auto">
                            <x-table>
                                <x-slot name="header">
                                    <tr>
                                        <th>Title</th>
                                        <th>Type</th>
                                        <th>URL</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </x-slot>

                                <template x-for="item in items" :key="item.id">
                                    <tr>
                                        <td x-text="item.title"></td>
                                        <td x-text="item.type"></td>
                                        <td>
                                            <a :href="item.url" target="_blank" class="text-blue-600 underline">View</a>
                                        </td>
                                        <td x-text="item.status"></td>
                                        <td>
                                            <x-button @click="openEditModal(item)" class="btn-primary">
                                                <i class="fa fa-edit"></i>
                                            </x-button>
                                            <x-button @click="deleteItem(item.id)" class="btn-danger">
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
            <x-modal id="createKnowledgeBaseModal" x-show="showCreateModal" x-cloak @click.away="showCreateModal = false">
                <x-slot name="header">
                    <h3 class="text-lg font-semibold text-gray-800">Create Knowledge Base</h3>
                </x-slot>
                <form @submit.prevent="createItem" enctype="multipart/form-data">
                    <div class="space-y-4">
                        <div>
                            <x-input label="Title" type="text" name="title" x-model="form.title" placeholder="Enter title" required />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Type</label>
                            <select x-model="form.type" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                <option value="">Select Type</option>
                                <option value="pdf">PDF</option>
                                <option value="file">File</option>
                                <option value="web">Web</option>
                            </select>
                        </div>
                        <div x-show="form.type === 'web'">
                            <x-input label="URL" type="url" name="url" x-model="form.url" placeholder="Enter URL" />
                        </div>
                        <div x-show="form.type === 'pdf' || form.type === 'file'">
                            <x-input label="Upload File" type="file" name="file" @change="handleFileUpload($event)" />
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
            <x-modal id="editKnowledgeBaseModal" x-show="showEditModal" x-cloak @click.away="showEditModal = false">
                <x-slot name="header">
                    <h3 class="text-lg font-semibold text-gray-800">Edit Knowledge Base</h3>
                </x-slot>
                <form @submit.prevent="updateItem" enctype="multipart/form-data">
                    <div class="space-y-4">
                        <div>
                            <x-input label="Title" type="text" name="title" x-model="form.title" required />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Type</label>
                            <select x-model="form.type" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                <option value="pdf">PDF</option>
                                <option value="file">File</option>
                                <option value="web">Web</option>
                            </select>
                        </div>
                        <div x-show="form.type === 'web'">
                            <x-input label="URL" type="url" name="url" x-model="form.url" />
                        </div>
                        <div x-show="form.type === 'pdf' || form.type === 'file'">
                            <x-input label="Replace File" type="file" name="file" @change="handleFileUpload($event)" />
                        </div>
                        <div class="flex justify-end space-x-3">
                            <x-button @click="showEditModal = false" type="button" class="btn-secondary">Cancel</x-button>
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
    Alpine.data('knowledgeBase', () => ({
        items: @json($knowledgeBases->toArray()['data']),
        showCreateModal: false,
        showEditModal: false,
        form: {
            id: null,
            title: '',
            type: '',
            url: '',
            file: null
        },

        openCreateModal() {
            this.resetForm();
            this.showCreateModal = true;
        },

        openEditModal(item) {
            this.form = { ...item, file: null };
            this.showEditModal = true;
        },

        handleFileUpload(event) {
            this.form.file = event.target.files[0];
        },

        async createItem() {
            try {
                const url = getMetaContent('app-url') + '/knowledge-base';
                let formData = new FormData();
                formData.append('title', this.form.title);
                formData.append('type', this.form.type);
                if (this.form.type === 'web') {
                    formData.append('url', this.form.url);
                }
                if ((this.form.type === 'pdf' || this.form.type === 'file') && this.form.file) {
                    formData.append('file', this.form.file);
                }

                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content },
                    body: formData
                });

                if (!response.ok) throw new Error('Failed to create resource');
                const data = await response.json();
                    
                console.log(data);

                this.items.push(data.data);
                this.showCreateModal = false;
                this.resetForm();

            } catch (error) {
                console.error('Error:', error);
                alert('Failed to create resource');
            }
        },

        async updateItem() {
            try {
                const url = getMetaContent('app-url') + '/knowledge-base/' + this.form.id;
                let formData = new FormData();
                formData.append('_method', 'PUT'); // Laravel method spoofing
                formData.append('title', this.form.title);
                formData.append('type', this.form.type);
                if (this.form.type === 'web') {
                    formData.append('url', this.form.url);
                }
                if ((this.form.type === 'pdf' || this.form.type === 'file') && this.form.file) {
                    formData.append('file', this.form.file);
                }

                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content },
                    body: formData
                });

                if (!response.ok) throw new Error('Failed to update resource');
                const data = await response.json();

                const index = this.items.findIndex(i => i.id === this.form.id);
                if (index !== -1) this.items[index] = data.data;

                this.showEditModal = false;
                this.resetForm();
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to update resource');
            }
        },

        async deleteItem(id) {
            const url = getMetaContent('app-url') + '/knowledge-base/' + id;
            if (!confirm('Are you sure you want to delete this resource?')) return;

            try {
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content }
                });

                if (!response.ok) throw new Error('Failed to delete resource');
                this.items = this.items.filter(i => i.id !== id);
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to delete resource');
            }
        },

        resetForm() {
            this.form = { id: null, title: '', type: '', url: '', file: null };
        }
    }));
});
</script>
@endsection
