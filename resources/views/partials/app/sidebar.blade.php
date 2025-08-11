<aside
    class="fixed left-0 top-0 z-9999 flex h-screen w-[90px] flex-col justify-between overflow-y-hidden border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-black lg:static translate-x-0 transition-all duration-300">
    <!-- SIDEBAR HEADER -->
    <div>
        <div class="flex items-center justify-center gap-4 pt-8 sidebar-header pb-3 mb-4">
            <a href="{{ route('dashboard') }}">
                <img src="{{ asset('system') }}/images/icons/norma-header.png" alt="Logo" />
            </a>
        </div>

        <!-- SIDEBAR MENU -->
        <div class="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
            <nav>
                <ul class="flex flex-col gap-6 mb-6 text-center">
                    <!-- Dashboard -->
                    <li>
                        <a href="{{ route('dashboard') }}"
                            class="group relative flex flex-col items-center justify-center gap-1 text-gray-600 dark:text-gray-300 hover:text-primary"
                            title="Dashboard">
                            <img src="{{ asset('system/images/icons/home.png') }}" />
                            <span
                                class="text-xs absolute top-full mt-4 w-max px-2 py-1 bg-gray-800 text-white text-[11px] rounded opacity-0 group-hover:opacity-100 transition-opacity">Dashboard</span>
                        </a>
                    </li>

                    <!-- Chat -->
                    <li>
                        <a href="{{ route('chat') }}"
                            class="group relative flex flex-col items-center justify-center gap-1 text-gray-600 dark:text-gray-300 hover:text-primary"
                            title="Chat">
                            <img src="{{ asset('system/images/icons/chat.png') }}" />
                            <span
                                class="text-xs absolute top-full mt-1 w-max px-2 py-1 bg-gray-800 text-white text-[11px] rounded opacity-0 group-hover:opacity-100 transition-opacity">Chat</span>
                        </a>
                    </li>

                    <!-- AI Flow -->
                    <li>
                        <a href="{{ route('workflow') }}"
                            class="group relative flex flex-col items-center justify-center gap-1 text-gray-600 dark:text-gray-300 hover:text-primary"
                            title="AI Flow">
                            <img src="{{ asset('system/images/icons/workflow.png') }}" />
                            <span
                                class="text-xs absolute top-full mt-1 w-max px-2 py-1 bg-gray-800 text-white text-[11px] rounded opacity-0 group-hover:opacity-100 transition-opacity">AI
                                Flow</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>

    <!-- LOGOUT BUTTON AT BOTTOM -->
    <div class="mb-6 text-center flex flex-col items-center gap-6">
        <!-- Settings -->
        <a href="{{ route('profile') }}"
            class="group relative flex flex-col items-center justify-center gap-1 text-gray-600 dark:text-gray-300 hover:text-primary"
            title="Settings">
            <img src="{{ asset('system/images/icons/setting.png') }}" />
            <span
                class="text-xs fixed top-full mt-1 w-max px-2 py-1 bg-gray-800 text-white text-[11px] rounded opacity-0 group-hover:opacity-100 transition-opacity">Settings</span>
        </a>

        <!-- Logout -->
        <form method="POST" action="{{ route('logout') }}" x-data>
            @csrf
            <a href="{{ route('logout') }}" @click.prevent="$el.closest('form').submit()"
                class="group relative flex flex-col items-center justify-center gap-1 text-gray-600 dark:text-gray-300 hover:text-primary"
                title="Logout">
                <img src="{{ asset('system/images/icons/logout-user.png') }}" />
                <span
                    class="text-xs absolute top-full mt-1 w-max px-2 py-1 bg-gray-800 text-white text-[11px] rounded opacity-0 group-hover:opacity-100 transition-opacity">Logout</span>
            </a>
        </form>
    </div>

</aside>
